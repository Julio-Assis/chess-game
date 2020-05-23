import { Bishop } from './Bishop';
import { Board } from '../board/Board';
import { PIECE_TEAM } from './Piece';
import { Position } from './Move';
import { isEqual } from 'lodash';

describe('Bishop piece tests', () => {
    let board: Board;
    let bishop: Bishop;

    it('should get the whole diagonal of the board when it is alone', () => {

        board = Board.createCustomBoard({ rows: 2, columns: 2 });
        const initialPosition: Position = { row: 0, column: 0 };
        bishop = new Bishop(PIECE_TEAM.WHITE, board, initialPosition);
        board.addPiecesToCustomBoard([bishop]);

        const availableMoves = bishop.getAvailableMoves(initialPosition);
        expect(availableMoves.length).toBe(1);
        expect(availableMoves[0].getStartPosition()).toEqual(initialPosition);
        expect(availableMoves[0].getEndPosition()).toEqual({ row: 1, column: 1 });
    });

    it('should get all the four corners when bishop is in the middle', () => {
        board = Board.createCustomBoard({ rows: 3, columns: 3 });
        const initialPosition: Position = { row: 1, column: 1 };
        bishop = new Bishop(PIECE_TEAM.BLACK, board, initialPosition);
        board.addPiecesToCustomBoard([bishop]);

        const availableMoves = bishop.getAvailableMoves(initialPosition);
        expect(availableMoves.length).toBe(4);

        let corner: Position = { row: 2, column: 2 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), corner))?.getEndPosition()).toEqual(corner);

        corner = { row: 0, column: 0 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), corner))?.getEndPosition()).toEqual(corner);

        corner = { row: 0, column: 2 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), corner))?.getEndPosition()).toEqual(corner);

        corner = { row: 2, column: 0 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), corner))?.getEndPosition()).toEqual(corner);
    });


    it('should get all the four corners when bishop is in the middle on larger board', () => {
        board = Board.createCustomBoard({ rows: 5, columns: 5 });
        const initialPosition: Position = { row: 2, column: 2 };
        bishop = new Bishop(PIECE_TEAM.BLACK, board, initialPosition);
        board.addPiecesToCustomBoard([bishop]);

        const availableMoves = bishop.getAvailableMoves(initialPosition);
        expect(availableMoves.length).toBe(8);

        let corner: Position = { row: 4, column: 4 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), corner))?.getEndPosition()).toEqual(corner);

        corner = { row: 0, column: 0 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), corner))?.getEndPosition()).toEqual(corner);

        corner = { row: 0, column: 4 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), corner))?.getEndPosition()).toEqual(corner);

        corner = { row: 4, column: 0 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), corner))?.getEndPosition()).toEqual(corner);
    });

    it('should get the correct moves considering allies and enemies on the board', () => {
        board = Board.createCustomBoard({ rows: 5, columns: 5 });
        const initialPosition: Position = { row: 2, column: 2 };
        bishop = new Bishop(PIECE_TEAM.WHITE, board, initialPosition);

        const enemy = new Bishop(PIECE_TEAM.BLACK, board, { row: 3, column: 3 });
        const friend = new Bishop(PIECE_TEAM.WHITE, board, { row: 1, column: 1 });
        board.addPiecesToCustomBoard([bishop, enemy, friend]);

        const availableMoves = bishop.getAvailableMoves(initialPosition);
        expect(availableMoves.length).toBe(5);

        let corner: Position = enemy.getInitialPosition();
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), corner))?.getEndPosition()).toEqual(corner);

        corner = friend.getInitialPosition();
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), corner))?.getEndPosition()).toEqual(undefined);

        corner = { row: 0, column: 4 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), corner))?.getEndPosition()).toEqual(corner);

        corner = { row: 4, column: 0 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), corner))?.getEndPosition()).toEqual(corner);
    });
});
