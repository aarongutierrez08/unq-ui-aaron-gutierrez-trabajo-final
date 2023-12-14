const colocarBarcosAleatoriamente = (tablero) => {
  const barcos = [
    { tipo: 'portaaviones', longitud: 5 },
    { tipo: 'crucero', longitud: 4 },
    { tipo: 'submarino', longitud: 3 },
    { tipo: 'lancha', longitud: 2 },
  ];

  const tableroConBarcos = [...tablero];

  for (let barco of barcos) {
    let longitud = barco.longitud;
    let puesto = true
    while (puesto) {
      const fila = Math.floor(Math.random() * 10);
      const columna = Math.floor(Math.random() * 10);

      const direccion = Math.random() < 0.5 ? 'horizontal' : 'vertical';

      if (puedeColocarse(tableroConBarcos, fila, columna, direccion, longitud)) {
        colocarBarco(tableroConBarcos, fila, columna, direccion, longitud);
        puesto = false;
      }
    }
  }

  return tableroConBarcos;
};

const puedeColocarse = (tablero, fila, columna, direccion, longitud) => {
  if (direccion === 'horizontal') {
    if (columna + longitud > 10) {
      return false;
    }
    for (let i = columna; i < columna + longitud; i++) {
      if (tablero[fila][i] !== 0) {
        return false;
      }
    }
  } else {
    if (fila + longitud > 10) {
      return false;
    }
    for (let i = fila; i < fila + longitud; i++) {
      if (tablero[i][columna] !== 0) {
        return false;
      }
    }
  }
  return true;
};

const colocarBarco = (tablero, fila, columna, direccion, longitud) => {
  if (direccion === 'horizontal') {
    for (let i = columna; i < columna + longitud; i++) {
      tablero[fila][i] = 1;
    }
  } else {
    for (let i = fila; i < fila + longitud; i++) {
      tablero[i][columna] = 1;
    }
  }
};

export { colocarBarcosAleatoriamente };
