import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// test('place an X in the first square', () => {
//   render(<App />);

//   const squares = screen.getAllByRole('button');
//   const firstSquare = squares[0];

//   expect(firstSquare.innerHTML).toEqual('');
  
//   fireEvent.click(firstSquare);

//   expect(firstSquare.innerHTML).toEqual('X');
// });

// test('place an O in the second square', () => {
//   render(<App />);

//   const squares = screen.getAllByRole('button');
//   const firstSquare = squares[0];
//   const secondSquare = squares[1];

//   expect(secondSquare.innerHTML).toEqual('');
  
//   fireEvent.click(firstSquare);
//   fireEvent.click(secondSquare);

//   expect(secondSquare.innerHTML).toEqual('O');
// });

// test('cannot place an O on top of an X', () => {
//   render(<App />);

//   const squares = screen.getAllByRole('button');
//   const firstSquare = squares[0];

//   expect(firstSquare.innerHTML).toEqual('');
  
//   fireEvent.click(firstSquare);

//   expect(firstSquare.innerHTML).toEqual('X');

//   fireEvent.click(firstSquare);

//   expect(firstSquare.innerHTML).toEqual('X');
// });
