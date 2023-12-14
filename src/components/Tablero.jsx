import React from 'react';
import Casilla from './Casilla';

const Tablero = ({ tablero, onCasillaClick }) => {
  return (
    <div className="tablero">
      {tablero.map((fila, filaIndex) => (
        <div key={filaIndex} className="fila">
          {fila.map((casilla, colIndex) => (
            <Casilla
              key={colIndex}
              fila={filaIndex}
              columna={colIndex}
              contenido={casilla}
              onClick={() => onCasillaClick(filaIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Tablero;
