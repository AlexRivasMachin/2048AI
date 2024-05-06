import React, { useState, useEffect } from 'react';
import "../Styles/Cell.css";
import "../Styles/animations.css";
import {CellHandler} from '../services/Cell.ts';
import { observer } from "mobx-react";


interface CellProps {
  cellHandler: CellHandler;
}


export const Cell: React.FC<CellProps> = observer(({cellHandler }) => {

  const [cellValue, setCellValue] = useState(cellHandler.cell.value);
  const [isMoving, setIsMoving] = useState(false);
  const [isAppearing, setIsAppearing] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  useEffect(() => {
    setCellValue(cellHandler.cell.value);
    setIsMoving(true);
  }, [cellHandler.cell.value]);

  useEffect(() => {
    if (isMoving) {
      setTimeout(() => setIsMoving(false),200);
    }
  }, [isMoving]);

  useEffect(() => {
    if (!isAppearing && !isStarting) {
      setIsAppearing(true);
      setIsStarting(true);
      setTimeout(() => setIsAppearing(false), 200);
    }
  }
  , [cellValue, isAppearing, isStarting]);

  // useEffect(() => {
  //   if (cellValue === 2 || cellValue === 4 && !isMerge) {
  //     setIsAppearing(true);
  //     setTimeout(() => setIsAppearing(false), 200);
  //   }
  // }, [cellValue]);

  useEffect(() => {
    if (cellValue === 777) {
      setIsMoving(true);
      setTimeout(() => setIsMoving(false), 200);
    }
  }, [cellValue]);

  

  return (
    <div 
    className={`cell ${isMoving ? 'move' : ''} ${isAppearing ? 'pop' : ''}`}
    style={{ 
      backgroundColor: `var(--color-cell-${cellValue})`, 
      border: cellValue > 1 ? '1px solid transparent' : '1px solid var(--color-font-primary-300)', 
      borderRadius: cellValue > 0 ? '5px' : '5px', 
    }}>
      <div className="cell-content" style={{
         color: cellValue > 4 ? 'var(--color-primary-100)' : 'inherit',
         display: (cellValue > 0 && cellValue !== 777) ? 'flex' : 'none',
         }}>
        <p>{cellValue}</p>
      </div>
    </div>
  );
});
