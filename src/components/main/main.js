import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import Game from "../game/game";
import { Howl } from "howler";
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { InputNumber } from "primereact/inputnumber";

export default function Main({ reactRoot, user }) {
  const [theme] = useState(
    new Howl({
      src: ["./audio/title_theme.wav"],
      loop: true,
      volume: 0.3,
    })
  );

  useEffect(() => {
    theme.play();
    window.addEventListener("keydown", (event) => {
      if (["ArrowUp", "ArrowDown"].includes(event.code)) {
        event.preventDefault();
      }
    });
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleSubmit = () => {
    const player = user ? user : undefined;
    theme.pause();
    if (reactRoot) {
      reactRoot.render(<Game player={player} reactRoot={reactRoot} />);
    } else {
      const root = ReactDOM.createRoot(document.getElementById("subRoot"));
      root.render(<Game player={player} reactRoot={root} />);
    }
  };

  const header = () => {
    return user ? (
      <p className="text-header">Hola de Nuevo ! {user.username}!</p>
    ) : (
      <p className="text-header">JAMAC-MAN!</p>
    );
  };

  const buttons = () => {
    return user ? (
      <button className="logout-button" onClick={handleLogout}>
        Log out
      </button>
    ) : (
      <div>
        <a href="/login">
          <button className="login-button">Log in</button>
        </a>
        <a href="/signup">
          <button className="signup-button">Sign up</button>
        </a>
      </div>
    );
  };

  const signupInstructions = () => {
    return user ? null : (
      // <></>
      <p className="signup-instructions">
        Make an account to submit your score onto the leaderboard!
      </p>
    );
  };

  return (
    <div className="main" id="main">
      {header()}
      {/* {buttons()} */}
      <br></br>
      <br></br>
      <img
        className="title-gif"
        src="/jama/jama_start.gif"
        alt="Pac-Man gif"
      />
      {signupInstructions()}
      <div className="flex flex-wrap align-items-center mb-3 gap-2">
          <label htmlFor="username" className="p-sr-only">Nombre</label>
          <InputText id="username" placeholder="Nombre" className="p-invalid mr-2" />
          {/* <Message severity="error" text="Username is required" /> */}
      </div>
      <div className="flex flex-wrap align-items-center gap-2">
          <label htmlFor="edad" className="p-sr-only">Edad</label>
          <InputNumber id="edad" placeholder="Edad" className="p-invalid mr-2" />
          {/* <Message severity="error" /> */}
      </div>
      {/* <div className="register"> */}
       <Button label="Jugar  !" icon="pi pi-check" onClick={handleSubmit}/>
      {/* </div> */}
      <p className="name-error" id="name-error"></p>
      <p className="instructions">
        Use the directional keys to move Pac-Man around the board while avoiding
        the ghosts as best you can. Pick up a power up and then attack the
        ghosts! Eat all the pellets on the board to level up. Press esc to pause
        and unpause the game at any time. (For mobile and tablet users, a D-pad
        will appear below the board for you to move Pac-Man around)
      </p>
    </div>
  );
}
