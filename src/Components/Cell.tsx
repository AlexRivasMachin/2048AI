import '../Styles/Cell.css'
import type {Cell} from '../types'


function Cell(cell: Cell) {
    return (
        <div className="cell">
            <div className="cell-content">
                <p>{cell.value}</p>
            </div>
        </div>
    );
}

export default Cell;