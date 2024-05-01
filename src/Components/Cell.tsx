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
      <div className="cell-content" style={{
         color: cellValue > 4 ? 'var(--color-primary-100)' : 'inherit',
         display: cellValue > 0 ? 'flex' : 'none'
         }}>
        <p>{cellValue}</p>
      </div>
    </div>
  );
});
