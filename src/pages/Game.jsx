import React, { useState, useEffect } from 'react';
import Tablero from '../components/Tablero';
import { colocarBarcosAleatoriamente } from '../utils/utils';

const Game = () => {
  const [tableroJugador, setTableroJugador] = useState([]);
  const [tableroMaquina, setTableroMaquina] = useState([]);

  useEffect(() => {
    const tableroInicial = Array.from({ length: 10 }, () =>
      Array(10).fill(0)
    );

    const tableroJugadorInicial = tableroInicial.map(row => [...row]);
    const tableroMaquinaInicial = tableroInicial.map(row => [...row]);

    setTableroJugador(tableroJugadorInicial);
    setTableroMaquina(colocarBarcosAleatoriamente(tableroMaquinaInicial));
  }, []);

  const handleCasillaJugadorClick = (fila, columna) => {
    if (tableroJugador[fila][columna] !== 0) {
      return;
    }
  
    const ataqueExitoso = tableroMaquina[fila][columna] === 1;
  
    const nuevoTableroJugador = [...tableroJugador];
    if (ataqueExitoso) {
      nuevoTableroJugador[fila][columna] = 'X';
    } else {
      nuevoTableroJugador[fila][columna] = '-';
    }
    setTableroJugador(nuevoTableroJugador);
  };


  return (
    <div className="juego">
      <h1>Batalla Naval</h1>
      <div className="tableros">
        <div className="tablero-jugador">
          <h2>Tablero del Jugador</h2>
          <Tablero
            tablero={tableroJugador}
            onCasillaClick={handleCasillaJugadorClick}
          />
        </div>
        <div className="tablero-maquina">
          <h2>Tablero de la Máquina</h2>
          <Tablero tablero={tableroMaquina} onCasillaClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default Game;
