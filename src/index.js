import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button 
            className="square"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

function Board(props) {
    const renderSquare = ({index, row, column}) => {
        return (
            <Square 
                key={row + column}
                value={props.squares[index]} 
                onClick={() => props.onClick(index, row, column)}
            />
        );
    }

    const columns = [1, 2, 3]

    const renderRow = (row) => (
        <div key={row} className="board-row">
            {columns.map((column) => (
                renderSquare({
                index: (column - 1) + (3 * (row - 1)),
                row, 
                column,
            })
            ))}
        </div>
    )

    const rows = [1, 2, 3];

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
        }
    }

    getPlayer () {
        return this.state.xIsNext ? 'X' : 'O'
    }

    handleClick (index, row, column) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const currentBoard = history[history.length - 1];
        const newSquares = currentBoard.squares.slice();

        if (this.calculateWinner(newSquares) || newSquares[index]) {
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
        });
    }

    jumpTo (step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2 === 0),
            selected: step,
        });
    }

    calculateWinner (squares) {
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
            if (squares[a] === squares[b] && squares[b] === squares[c]) {
                return squares[a];
            }
        }

        return null;
    };

    sortMoves () {
        this.setState({
            movesDescending: !this.state.movesDescending
        })
    }

    render () {
        let history = this.state.history;
        const currentBoard = history[this.state.stepNumber];
        const winner = this.calculateWinner(currentBoard.squares);

        let status;

        if (winner) {
            status = 'Winner: ' + winner
        } else {
            status = `Next player: ${this.getPlayer()}`;
        }

        if (!this.state.movesDescending) {
            debugger;
            history = history.reverse();
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
                        {index ?
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
                        squares={ currentBoard.squares}
                        onClick={this.handleClick.bind(this)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button onClick={() => this.sortMoves()}>
                        Sort moves
                    </button>
                    <ol>{moves}</ol>
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
