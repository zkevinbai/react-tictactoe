import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square({
    squareClass,
    onClick,
    value,
    index,
    row,
    column,
}) {
    return (
        <button 
            className={`square ${squareClass}`}
            onClick={() => onClick(index, row, column)}
        >
            {value}
        </button>
    );
}

function Board({ 
    squares,
    onClick,
    winningMoves,
}) {
    const columns = [1, 2, 3]
    const rows = [1, 2, 3];

    const renderRow = (row) => (
        <div key={row} className="board-row">
            {columns.map((column) => {
                const index = (column - 1) + (3 * (row - 1));
                // this generates indices 0 through 8
                // I would prefer to hard code for clarity, this is for a challenge

                let squareClass = "";

                if (winningMoves.includes(index)) {
                    squareClass = 'square-winning'
                }

                return (
                    <Square
                        squareClass={squareClass}
                        key={row + column}
                        value={squares[index]}
                        index={index}
                        row={row}
                        column={column}
                        onClick={onClick}
                    />
                )
            })}
        </div>
    )

    return (
        <div>
            {rows.map((row) => renderRow(row))}
        </div>
    );
}

class Game extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                player: null,
                moveRow: null,
                moveColumn: null,
            }],
            xIsNext: true,
            winner: false,
            stepNumber: 0,
            selected: null,
            movesDescending: true,
            winningMoves: null,
        }
    }

    getPlayer () {
        return this.state.xIsNext ? 'X' : 'O'
    }

    handleClick (index, row, column) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const currentBoard = history[history.length - 1];
        const newSquares = currentBoard.squares.slice();

        const winningMoves = this.calculateWinningMoves(newSquares);

        if (winningMoves || newSquares[index]) {
            this.setState({
                winningMoves,
            })
            return;
        }

        const player = this.getPlayer();

        newSquares[index] = player;

        this.setState({
            history: history.concat([{
                squares: newSquares,
                player,
                moveRow: row,
                moveColumn: column,
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length, // this is the current history length, before the concat fires
                // if we are adding step 2, and will have 2 history items after
                // history.length will still evaluate to 1
                // but 1 is the correct stepNumber to access the last element in the history array
                // because you count from 0 in JS
            winningMoves: this.calculateWinningMoves(newSquares),
        });
    }

    calculateWinningMoves (squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] === squares[b] && squares[b] === squares[c] && squares[a] !== null) {
                return lines[i];
            }
        }

        return null;
    };

    jumpTo (step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2 === 0),
            selected: step,
        });
    }

    sortMoves () {
        this.setState({
            movesDescending: !this.state.movesDescending
        })
    }

    render () {
        const history = this.state.history;
        const currentBoard = history[this.state.stepNumber];
        const winningMoves = this.calculateWinningMoves(currentBoard.squares);
        const tie = currentBoard.squares.every(position => position) && !winningMoves;

        let status;

        if (winningMoves) {
            status = 'Winner: ' + currentBoard.squares[winningMoves[0]]
        } else if (tie) {
            status = 'Tie game no winner'
        } else {
            status = `Next player: ${this.getPlayer()}`;
        }

        let movesClassName = '';
    
        if (!this.state.movesDescending) {
            movesClassName = 'game-moves-reversed'
        }

        const moves = history.map( (board, index) => {
            const { player, moveRow, moveColumn } = board;

            let buttonClassName = "game-move-button";
            if (this.state.selected === index) {
                buttonClassName = "game-move-button game-move-button-selected"
            }

            return (
                <li
                    key={index}
                >
                    <button className={buttonClassName} onClick={() => this.jumpTo(index)}>
                        {moveRow && moveColumn ?
                            `Go to move # ${index} by ${player} at row ${moveRow} and column ${moveColumn}`:
                            'Go to game start'
                        }
                    </button>
                </li>
            )
        })

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        winningMoves={this.state.winningMoves || []}
                        squares={currentBoard.squares}
                        onClick={this.handleClick.bind(this)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button
                        onClick={() => this.sortMoves()}
                    >
                        Sort Moves
                    </button>
                    <ol
                        className={movesClassName}
                    >
                        {moves}
                    </ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
