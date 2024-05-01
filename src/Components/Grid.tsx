import {GridHandler} from '../services/Grid';
import { CellHandler } from '../services/Cell';
import {Cell} from './Cell.tsx';
import React from 'react';

interface GridProps {
    gridHandler: GridHandler;
}

const Grid: React.FC<GridProps> = ({ gridHandler }) => {

    







    return (
        <div className='board'>
            {gridHandler.grid.cells.flat().map((cellHandler: CellHandler, index) => 
                <Cell key={index} cellHandler={cellHandler} />
            )}
        </div>
    )
}

export default Grid;