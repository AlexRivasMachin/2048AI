import React from 'react';
import '../Styles/Cell.css'
import type {Cell} from '../types'
import { Position } from '../types';
import { Cell } from '../types';

/* TODO
*  LA CELDA TIENE UN VALOR, POR DEFECTO ES 0 PERO SE DEFINE EN EL GRID 
*  LA CELDA TIENE UNA POSICION, QUE SE DEFINE EN EL GRID
*   
* 
* 
*
*/

const CELL_COLOR = {
    0: '#cdc1b4',
    2: '#eee4da',
    4: '#ede0c8',
    8: '#f2b179',
    16: '#f59563',
    32: '#f67c5f',
    64: '#f65e3b',
    128: '#edcf72',
    256: '#edcc61',
    512: '#edc850',
    1024: '#edc53f',
    2048: '#edc22e',
  } as const;


const Cell: React.FC<Cell> = ({position, value}) => {

    const [cellValue, setCellValue] = React.useState(value|0);
    
    //handleChangeValue

    

    return (
        <div className="cell">
            <div className="cell-content">
              {
                <p>{value}</p>
              }
            </div>
        </div>
    );
}

export default Cell;
