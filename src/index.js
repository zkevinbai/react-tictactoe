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

    constructor(props) {
        super(props)
        this.state = {
            squares: Array(9).fill(null),
            next: 'X',
            winner: false,
        }
    }

    handleClick(i) {
        const newSquares = this.state.squares.slice();
        newSquares[i] = this.state.next;
        let newNext;
        if (this.state.next === 'X'){
            newNext = 'O';
        } else {
            newNext = 'X';
        };

        this.checkWinner(newSquares);

        this.setState({
            squares: newSquares,
            next: newNext,
        });
    }

    checkWinner(squares) {
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
            const line = lines[i];

            const winningLine = this.checkLine({line, squares});
            if (winningLine) {
                this.setState({ hasWon: true })
                return;
            }
        }

        this.setState({ hasWon: false })
    };

    checkLine({line, squares}) {
        if (squares[line[0]] === null) {
            return false;
        }

        return squares[line[0]] === squares[line[1]] &&
            squares[line[1]]  === squares[line[2]];
    }

    renderSquare(i) {
        return <Square 
            value={this.state.squares[i]} 
            onClick={() => this.handleClick(i)}
            />;
    }

    render() {
        const status = `Next player: ${this.state.next}`;
        const winning = `Someone has Won: ${this.state.hasWon}`;

        return (
            <div>
                <div className="status">{status}</div>
                <div className="status">{winning}</div>
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
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
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
