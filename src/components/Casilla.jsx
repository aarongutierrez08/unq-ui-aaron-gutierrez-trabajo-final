import React from 'react';

const Casilla = ({ fila, columna, contenido, onClick }) => {
  return (
    <div className="casilla" onClick={onClick}>
      {contenido}
    </div>
  );
};

export default Casilla;
