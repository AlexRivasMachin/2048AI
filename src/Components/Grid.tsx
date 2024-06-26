import {GridHandler} from '../services/Grid';
import { CellHandler } from '../services/Cell';
import {Cell} from './Cell.tsx';
import React from 'react';
import '../Styles/Grid.css';

interface GridProps {
    gridHandler: GridHandler;
}

const Grid: React.FC<GridProps> = ({ gridHandler }) => {

return (
    <div className='boardContainer'>
        {gridHandler.grid.cells.map((row, rowIndex) => 
        <div key={rowIndex} className='row'>
            {row.map((cellHandler: CellHandler, columnIndex) => 
            <Cell key={columnIndex} cellHandler={cellHandler} />
            )}
        </div>
        )}
    </div>
)
}

export default Grid;