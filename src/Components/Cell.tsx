import React, { useState, useEffect } from 'react';
import "../Styles/Cell.css";
import {CellHandler} from '../services/Cell.ts';
import { observer } from "mobx-react";


/* TODO
 *  2048 CELL
 *  LA CELDA TIENE UN VALOR, POR DEFECTO ES 0 PERO SE DEFINE EN EL GRID
 *  LA CELDA TIENE UNA POSICION, QUE SE DEFINE EN EL GRID
 *
 *
 *
 *
 */

// QUE CAMBIA EL VALUE, PORQUE SE LE PASA UNO NUEVO
// O CAMBIA EL CELLVALUE => EL USEEFFECT DEPENDE ESTO

/*TODO => HACER QUE EL VALUE SEA  0, 2 o 4, que el 2 sea un 66 y el 4 un 33, por ota parte hay que tener un método*/
interface CellProps {
  cellHandler: CellHandler;
}


export const Cell: React.FC<CellProps> = observer(({cellHandler }) => {

  const [cellValue, setCellValue] = useState(cellHandler.cell.value);

  /*TODO => HACER QUE EL VALUE SEA  0, 2 o 4, que el 2 sea un 66 y el 4 un 33, por ota parte hay que tener un método*/
  const handleCreationValue = () => {
    const ramValue = Math.random()
    if (ramValue < 0.1) {
      setCellValue(2);
    }
    if( ramValue >= 0.1 && ramValue < 0.2) {
      setCellValue(4);
    }
    if( ramValue >= 0.99) {
      setCellValue(0);
    }
    if( ramValue >= 0.3 && ramValue < 0.4) {
      setCellValue(8);
    }
    if( ramValue >= 0.5 && ramValue < 0.6) {
      setCellValue(16);
    }
    if( ramValue >= 0.7 && ramValue < 0.8) {
      setCellValue(32);
    }
    if( ramValue >= 0.8 && ramValue < 0.9) {
      setCellValue(64);
    }
    if( ramValue >= 0.9 && ramValue < 0.95) {
      setCellValue(128);
    }
    if( ramValue >= 0.95 && ramValue < 0.96) {
      setCellValue(256);
    }
    if( ramValue >= 0.96 && ramValue < 0.97) {
      setCellValue(512);
    }
    if( ramValue >= 0.97 && ramValue < 0.98) {
      setCellValue(1024);
    }
    if( ramValue >= 0.98 && ramValue < 0.99) {
      setCellValue(2048);
    }
  }

  const handleChangeValue = (value: number) => {
    //poner color
    setCellValue(value);
  };

  //handleChangeValue

  useEffect(() => {
    setCellValue(cellHandler.cell.value);
    //setCellColor(CELL_COLOR[cellValue]);
  }, [cellHandler.cell.value]);

  /*
  useEffect(() => {
    handleCreationValue();
  }, []);
  */

  return (
    <div className="cell" style={{ 
      backgroundColor: `var(--color-cell-${cellValue})`, 
      border: cellValue > 1 ? '1px solid transparent' : '1px solid var(--color-font-primary-300)', 
      borderRadius: cellValue > 0 ? '5px' : '10px' 
    }}>
      <div className="cell-content" style={{ color: cellValue > 4 ? 'var(--color-primary-100)' : 'inherit' }}>
        <p>{cellValue}</p>
      </div>
    </div>
  );
});
