import React, { Component } from "react";

import Modal from "../components/grid/Modal";
import history from "../utils/history";
import Grid from "../components/grid/Grid";

import blue from "../assets/fichaAzul.png";
import red from "../assets/fichaRoja.png";
import axios from "../axios";
import Confirm from "../components/confirmModal/Confirm";
import "./game.css";

class PageUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      cases: [null, blue, red],
      count: 0,
      disabledClick: false,
      showModal: false,
      winner: 0,
      freeSpaces: 42,
      turn: null,
      refresh: null,
      showConfirm: false,
      createdBy: null
    };
  }

  checkWin = (row, col) => {
    let player = this.state.board[row][col];
    let rows = this.state.board.length;
    let cols = this.state.board[0].length;

    //verifico ganadores en el eje Y solo a partir de cuando 4 apilados
    if (row < rows - 3) {
      if (
        this.state.board[row][col] === player &&
        this.state.board[row + 1][col] === player &&
        this.state.board[row + 2][col] === player &&
        this.state.board[row + 3][col] === player
      ) {
        this.setState({ winner: player, showModal: true });
      }
    }

    //verifico ganadores en el eje de x
    let prev = 0;
    let count = 1;
    for (let i = 0; i < cols; i++) {
      if (this.state.board[row][i] === 0) {
        count = 0;
        prev = 0;
      } else {
        if (prev !== this.state.board[row][i]) {
          prev = this.state.board[row][i];
          count = 1;
        } else {
          count++;
        }
      }
      if (count === 4) {
        this.setState({ winner: this.state.board[row][i], showModal: true });
      }
    }

    //verifico ganadores en las diagonales (de abajo izquierda a arriba derecha) (/)
    let initCol = col;
    let initRow = row;

    while (initRow < this.state.board.length - 1 && initCol > 0) {
      initRow++;
      initCol--;
    }

    count = 0;
    prev = 0;
    while (initRow >= 0 && initCol <= cols) {
      if (this.state.board[initRow][initCol] === 0) {
        count = 0;
        prev = 0;
      } else {
        if (prev !== this.state.board[initRow][initCol]) {
          prev = this.state.board[initRow][initCol];
          count = 1;
        } else {
          count++;
        }
      }
      if (count === 4) {
        this.setState({
          winner: this.state.board[initRow][initCol],
          showModal: true
        });
      }

      initRow--;
      initCol++;
    }

    //verifico ganadores en las diagonales (de arriba izquierda a abajo derecha) (\)

    initCol = col;
    initRow = row;

    while (initRow > 0 && initCol > 0) {
      initRow--;
      initCol--;
    }

    count = 0;
    prev = 0;
    while (initRow < this.state.board.length && initCol < cols) {
      if (this.state.board[initRow][initCol] === 0) {
        count = 0;
        prev = 0;
      } else {
        if (prev !== this.state.board[initRow][initCol]) {
          prev = this.state.board[initRow][initCol];
          count = 1;
        } else {
          count++;
        }
      }
      if (count === 4) {
        let interval = this.state.refresh;
        clearInterval(interval)
        this.setState({
          winner: this.state.board[initRow][initCol],
          showModal: true,
          refresh: null
        });
      }

      initRow++;
      initCol++;
    }
  };

  handleClick = (row, col) => {
    const userId = localStorage.getItem("userId");
    console.log(this.state.turn);
    console.log(userId);
    if (
      !this.state.disabledClick &&
      this.state.board[0][col] === 0 &&
      this.state.turn &&
      this.state.turn === userId
    ) {
      this.setState({
        disabledClick: true,
        freeSpaces: this.state.freeSpaces - 1
      });

      let rows = this.state.board.length;
      let actualRow = null;
      let nextValue = userId === this.state.createdBy ? 1 : 2;
      for (let i = 0; i < rows; i++) {
        if (this.state.board[i][col] === 0) {
          actualRow = i;
        }
      }

      if (actualRow != null) {
        let board = this.state.board.map(row => [...row]);
        let count = 0;
        let updatedCount = this.state.count + 1;
        var interval = setInterval(() => {
          board[count][col] = nextValue;
          if (count > 0) {
            board[count - 1][col] = 0;
          }
          this.setState({ board, count: updatedCount });

          if (count === actualRow) {
            clearInterval(interval);
            this.setState({ disabledClick: false, turn: null }, () => {
              this.updateGame(actualRow, col);
              this.checkWin(actualRow, col);
            });
          } else {
            count++;
          }
        }, 75);
      }
    }
  };

  resetGame = () => {
    let newBoard = this.state.board.map(i =>
      i.map(j => {
        return 0;
      })
    );
    this.setState({
      board: newBoard,
      showModal: false,
      winner: 0,
      freeSpaces: 42
    });
  };

  getData = async () => {
    const roomId = this.props.match.params.id;
    const userId = localStorage.getItem("userId");
    let game = await axios
      .get("games/" + roomId, { headers: { Authorization: userId } })
      .catch(err => {
        console.log("Error: ", err.response.data.error);
      });
    if (!game) {
      history.replace("/lobby");
      return;
    } else {
      this.setState({
        board: game.data.data,
        turn: game.data.turn,
        createdBy: game.data.createdBy
      });
    }
    if (game.data.lastRow != null && game.data.lastCol != null) {
      this.checkWin(game.data.lastRow, game.data.lastCol);
    }
  };

  updateGame = async (row, col) => {
    const roomId = this.props.match.params.id;
    const userId = localStorage.getItem("userId");
    let data = {
      data: this.state.board,
      lastRow: row,
      lastCol: col
    };
    let game = await axios
      .put("games/" + roomId, data, { headers: { Authorization: userId } })
      .catch(err => {
        console.log("Error: ", err.response);
      });
    if (!game) {
      history.push("/lobby");
    } else {
      console.log("gameupdate: ", game);
      // this.
      // let turn =
      //   game.data.turn === game.data.player1
      //     ? game.data.player2
      //     : game.data.player1;
      this.setState({ turn: game.data.turn });
    }
  };

  exitGame = async () => {
    this.setState({ showConfirm: true });
  };

  async componentDidMount() {
    this.getData();
    let interval = setInterval(() => {
      this.getData();
    }, 3000);
    this.setState({ refresh: interval });
  }

  okClick = async () => {
    const roomId = this.props.match.params.id;
    const userId = localStorage.getItem("userId");
    axios.delete("games/" + roomId, {
      headers: { Authorization: userId }
    });
    history.replace("/lobby");
  };

  cancelClick = () => {
    this.setState({ showConfirm: false });
  };

  componentWillUnmount() {
    let interval = this.state.refresh;
    clearInterval(interval);
  }

  render() {
    return (
      <React.Fragment>
        <div className="">
          <button className="exitButton" onClick={this.exitGame}>
            Salir del Juego
          </button>
          {!this.state.board || this.state.board.length === 0 ? <h2>Esperando Jugador 2...</h2> : null}
          <Grid
            handleClick={this.handleClick}
            cases={this.state.cases}
            board={this.state.board}
          />
          {this.state.showModal || this.state.freeSpaces === 0 ? (
            <Modal
              winner={this.state.cases[this.state.winner]}
              resetGame={this.okClick}
            />
          ) : null}
          {this.state.showConfirm ? (
            <Confirm
              okText="Aceptar"
              cancelText="Cancelar"
              okClick={this.okClick}
              cancelClick={this.cancelClick}
            >
              ¿Salir del juego?
            </Confirm>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default PageUsers;
