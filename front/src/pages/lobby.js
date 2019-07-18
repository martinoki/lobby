import React, { Component } from "react";
import axios from "../axios";
import history from "../utils/history";

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
        this.getGames();
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
        console.log("Response: ", response.data);
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

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      history.push("/");
    } else {
      this.getGames(userId);

      const interval = setInterval(() => {
        this.getGames(userId);
      }, 3000);
      this.setState({refresh: interval})
    }
  }

  componentWillUnmount(){
    console.log("UNMONUNT");
    let refresh = this.state.refresh;
    clearInterval(refresh);
    this.setState({refresh: null});
  }

  render() {
    const userId = localStorage.getItem("userId");
    return (
      <React.Fragment>
        {/* <h1>Posts</h1>
        <button type="button" onClick={() => this.gotoBack()}>
          Back
        </button> */}
        <h1>MIS JUEGOS!</h1>
        <button onClick={() => this.createOrJoinGame(0)}>Crear Juego</button>
        <div>
          {this.state.games.map((game, index) => {
            return (
              <div key={index}>
                <p>
                  Juego {index + 1}
                  {userId !== game.createdBy &&
                  (!game.player1 || !game.player2) ? (
                    <button onClick={() => this.createOrJoinGame(game._id)}>
                      Unirse
                    </button>
                  ) : null}
                  {userId == game.createdBy ? (
                    <button onClick={() => this.deleteGame(game)}>
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
