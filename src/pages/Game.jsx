import React, { useState, useEffect } from 'react';
import Tablero from '../components/Tablero';
import { colocarBarcosAleatoriamente } from '../utils/utils';

const Game = () => {
  const [tableroJugador, setTableroJugador] = useState([]);
  const [tableroMaquina, setTableroMaquina] = useState([]);
  const [barcosRestantes, setBarcosRestantes] = useState(4);

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
      setBarcosRestantes(prevBarcos => prevBarcos - 1);
    } else {
      nuevoTableroJugador[fila][columna] = '-';
    }
    setTableroJugador(nuevoTableroJugador);

    // Verificar si todos los barcos fueron hundidos
    if (barcosRestantes === 0) {
      // Aquí puedes definir el final del juego, por ejemplo:
      alert('¡Has hundido todos los barcos! ¡Ganaste!');
      // Aquí puedes reiniciar el juego o realizar alguna acción posterior al final del juego
    }
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
