import { Knight } from './Knight';
import { Board } from '../board/Board';
import { PIECE_TEAM } from './Piece';
import { Position } from './Move';
import { isEqual } from 'lodash';

describe('Knight piece tests', () => {
    let board: Board;
    let knight: Knight;

    it('should find 0 moves when they do not fit on the board', () => {

        board = Board.createCustomBoard({ rows: 3, columns: 3 });
        const initialPosition: Position = { row: 1, column: 1 };
        knight = new Knight(PIECE_TEAM.WHITE, board, initialPosition);
        board.addPiecesToCustomBoard([knight]);

        const availableMoves = knight.getAvailableMoves(initialPosition);
        expect(availableMoves.length).toBe(0);
    });

    it('should get all the 8 targetPositions when Knight is in the middle', () => {
        board = Board.createCustomBoard({ rows: 5, columns: 5 });
        const initialPosition: Position = { row: 2, column: 2 };
        knight = new Knight(PIECE_TEAM.BLACK, board, initialPosition);
        board.addPiecesToCustomBoard([knight]);

        const availableMoves = knight.getAvailableMoves(initialPosition);
        expect(availableMoves.length).toBe(8);

        let targetPosition: Position = { row: 4, column: 3 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 4, column: 1 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 0, column: 1 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 0, column: 3 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 3, column: 4 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 3, column: 0 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 1, column: 4 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 1, column: 0 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);
    });


    it('should get the correct moves considering allies and enemies on the board', () => {
        board = Board.createCustomBoard({ rows: 5, columns: 5 });
        const initialPosition: Position = { row: 2, column: 2 };
        knight = new Knight(PIECE_TEAM.WHITE, board, initialPosition);

        const enemy = new Knight(PIECE_TEAM.BLACK, board, { row: 4, column: 3 });
        const friend = new Knight(PIECE_TEAM.WHITE, board, { row: 4, column: 1 });
        board.addPiecesToCustomBoard([knight, enemy, friend]);

        const availableMoves = knight.getAvailableMoves(initialPosition);
        expect(availableMoves.length).toBe(7);

        let targetPosition: Position = enemy.getInitialPosition();
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = friend.getInitialPosition();
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(undefined);

        targetPosition = { row: 0, column: 1 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 0, column: 3 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 3, column: 4 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 3, column: 0 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 1, column: 4 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 1, column: 0 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);
    });
});
