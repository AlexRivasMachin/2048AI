import {GridHandler} from '../services/Grid';
import { CellHandler } from '../services/Cell';
import {Cell} from './Cell';
import React from 'react';

function Grid(){

    const gridHandler : GridHandler = new GridHandler();

    







    return (
        <div>
            {gridHandler.grid.cells.flat().map((cellHandler: CellHandler) => {return <Cell cellHandler/>}}
        </div>
        
    )
}

export default Grid;