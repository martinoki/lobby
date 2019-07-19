import React, { Component } from "react";
import axios from "../axios";
import history from "../utils/history";
import "./lobby.css";

class PageLobby extends Component {
  state = {
    games: [],
    refresh: null
  };
  gotoBack() {
    history.push("/");
  }

  createOrJoinGame = roomId => {
    const userId = localStorage.getItem("userId");
    axios
      .post("/games/" + roomId, {}, { headers: { Authorization: userId } })
      .then(response => {
        history.push("/game/" + response.data._id);
      })
      .catch(err => {
        console.log("Error al crear Juego");
      });
  };

  getGames = userId => {
    axios
      .get("games", { headers: { Authorization: userId } })
      .then(response => {
        this.setState({ games: response.data });
      })
      .catch(error => {
        console.log("Error: ", error);
      });
  };

  deleteGame = game => {
    const userId = localStorage.getItem("userId");
    const roomId = game._id;
    axios
      .delete("games/" + roomId, { headers: { Authorization: userId } })
      .then(response => {
        this.getGames();
      })
      .catch(error => {
        console.log("Error: ", error);
      });
  };

  logout = () => {
    localStorage.removeItem("userId");
    history.push("/");
  };

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      history.push("/");
    } else {
      this.getGames(userId);

      const interval = setInterval(() => {
        this.getGames(userId);
      }, 3000);
      this.setState({ refresh: interval });
    }
  }

  componentWillUnmount() {
    let refresh = this.state.refresh;
    clearInterval(refresh);
    this.setState({ refresh: null });
  }

  render() {
    const userId = localStorage.getItem("userId");
    return (
      <React.Fragment>
        {/* <h1>Posts</h1>
        <button type="button" onClick={() => this.gotoBack()}>
          Back
        </button> */}
        <div style={{ display: "flex" }}>
          <button className="createButton" onClick={() => this.createOrJoinGame(0)}>+ Crear Juego</button>
          <button className="logoutButton" onClick={this.logout}>Cerrar Sesión</button>
        </div>
        <div>
          <h1 className="title">Salas</h1>
        </div>
        <div>
          {this.state.games.map((game, index) => {
            return (
              <div key={index}>
                <p>
                  Sala {index + 1}
                  {userId !== game.createdBy &&
                  (!game.player1 || !game.player2) ? (
                    <button className="joinButton" onClick={() => this.createOrJoinGame(game._id)}>
                      Unirse
                    </button>
                  ) : (
                    <span className="fullRoom"> (SALA LLENA)</span>
                  )}
                  {userId === game.createdBy ? (
                    <button className="deleteButton" onClick={() => this.deleteGame(game)}>
                      Eliminar Sala
                    </button>
                  ) : null}
                </p>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default PageLobby;
