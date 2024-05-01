import React from "react";
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

const CELL_COLOR = {
  0: "#cdc1b4",
  2: "#eee4da",
  4: "#ede0c8",
  8: "#f2b179",
  16: "#f59563",
  32: "#f67c5f",
  64: "#f65e3b",
  128: "#edcf72",
  256: "#edcc61",
  512: "#edc850",
  1024: "#edc53f",
  2048: "#edc22e",
} as const;

export type CellColorType = (typeof CELL_COLOR)[keyof typeof CELL_COLOR];

// QUE CAMBIA EL VALUE, PORQUE SE LE PASA UNO NUEVO
// O CAMBIA EL CELLVALUE => EL USEEFFECT DEPENDE ESTO

/*TODO => HACER QUE EL VALUE SEA  0, 2 o 4, que el 2 sea un 66 y el 4 un 33, por ota parte hay que tener un método*/
interface CellProps {
  cellHandler: CellHandler;
}


export const Cell: React.FC<CellProps> = observer(({ cellHandler }) => {

  const [cellValue, setCellValue] = React.useState(cellHandler.cell.value);

  const [cellColor, setCellColor] = React.useState<CellColorType>(
    CELL_COLOR[0]
  );

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
    //poner colort

    setCellValue(value);
  };

  //handleChangeValue

  React.useEffect(() => {
    setCellValue(cellHandler.cell.value);
    //setCellColor(CELL_COLOR[cellValue]);
  }, [cellHandler.cell.value]);

  return (
    <div className="cell" style={{ backgroundColor: `var(--color-cell-${cellValue})` }}>
            <div className="cell-content">{<p>{cellValue}</p>}</div>
    </div>
  );
});
