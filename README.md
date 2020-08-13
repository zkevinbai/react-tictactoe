# Tutorial
https://reactjs.org/tutorial/tutorial.html

- [x] Build game using react.
- [x] Allow game to declare winner.
- [x] Implement turn based time travel.

# Challenges
- [x] Display the location for each move in the format (col, row) in the move history list.
  - provide row and column data to your squares, pass that information up in their onclick function

- [x] Bold the currently selected item in the move list.
  - use the onClick of the move button to set currently selected index in state, apply custom class based on state

- [x] Rewrite Board to use two loops to make the squares instead of hardcoding them.
  - this just requires you to be clever, many ways to solve
  - my solution: `const index = (column - 1) + (3 * (row - 1));`

- [x] Add a toggle button that lets you sort the moves in either ascending or descending order.
  - accomplished using https://stackoverflow.com/questions/25695000/how-to-display-a-reverse-ordered-list-in-html

- [x] When someone wins, highlight the three squares that caused the win.
  - update the calculateWinner function to calculateWinningMoves, store moves in state
  - pass down winning moves to squares through board
  - apply custom styling to square if its index was one of the winning 3

- [x] When no one wins, display a message about the result being a draw.
  - calculate tie, set custom status if tie
  - my solution: `const tie = currentBoard.squares.every(position => position) && !winningMoves;`

These are supposed to be ranked in terms of increasing difficulty.  But I found 5 harder than 6. 

## Screenshot
<img src="https://github.com/zkevinbai/react-tictactoe/blob/master/assets/screen_shot.png" align="center"/>

## Time Travel
<img src="https://github.com/zkevinbai/react-tictactoe/blob/master/assets/time_travel.gif" align="center"/>

## Flip Direction
<img src="https://github.com/zkevinbai/react-tictactoe/blob/master/assets/flip_direction.gif" align="center"/>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console. [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

