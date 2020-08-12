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

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square 
                value={this.props.squares[i]} 
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
            winner: false,
            stepNumber: 0,
        }
    }

    handleClick(i) {
        const history = this.state.history;
        const currentBoard = history[history.length - 1];
        const newSquares = currentBoard.squares.slice();

        if (this.calculateWinner(newSquares) || newSquares[i]) {
            return;
        }

        newSquares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([{
                squares: newSquares,
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: this.state.stepNumber + 1
        });
    }

    jumpTo(index) {
        const history = this.state.history;
        const currentBoard = history[index];
        const newSquares = currentBoard.squares.slice();

        // this.setState({
        //     timeTravel: newSquares,
        // });
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 5],
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

    render() {
        const history = this.state.history;
        const currentBoard = history[history.length -1];
        const winner = this.calculateWinner(currentBoard.squares);

        let status;

        if (winner) {
            status = 'Winner: ' + winner
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        const moves = history.map( (board, index) => {
            return (
                <li
                    key={index}
                >
                    <button onClick={this.jumpTo(index)}>
                        {index ?
                            'Go to move #' + index :
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
                        squares={ this.state.timeTravel || currentBoard.squares}
                        onClick={this.handleClick.bind(this)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
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
