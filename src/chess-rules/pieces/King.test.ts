import { King } from './King';
import { Board } from '../board/Board';
import { PIECE_TEAM } from './Piece';
import { Position } from './Move';
import { isEqual } from 'lodash';

describe('King piece tests', () => {
    let board: Board;
    let king: King;

    it('should get the remaining 3 positions of the board when it is alone', () => {

        board = Board.createCustomBoard({ rows: 2, columns: 2 });
        const initialPosition: Position = { row: 0, column: 0 };
        king = new King(PIECE_TEAM.WHITE, board, initialPosition);
        board.addPiecesToCustomBoard([king]);

        const availableMoves = king.getAvailableMoves(initialPosition);
        expect(availableMoves.length).toBe(3);

        let targetPosition: Position = { row: 1, column: 0 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 0, column: 1 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 1, column: 1 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);
    });

    it('should get all the eight targetPositions when King is in the middle', () => {
        board = Board.createCustomBoard({ rows: 3, columns: 3 });
        const initialPosition: Position = { row: 1, column: 1 };
        king = new King(PIECE_TEAM.BLACK, board, initialPosition);
        board.addPiecesToCustomBoard([king]);

        const availableMoves = king.getAvailableMoves(initialPosition);
        expect(availableMoves.length).toBe(8);

        let targetPosition: Position = { row: 1, column: 2 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 1, column: 0 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 0, column: 1 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 2, column: 1 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 2, column: 2 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 0, column: 0 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 0, column: 2 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 2, column: 0 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);
    });


    it('should get all the 8 targetPositions when King is in the middle on larger board', () => {
        board = Board.createCustomBoard({ rows: 5, columns: 5 });
        const initialPosition: Position = { row: 2, column: 2 };
        king = new King(PIECE_TEAM.BLACK, board, initialPosition);
        board.addPiecesToCustomBoard([king]);

        const availableMoves = king.getAvailableMoves(initialPosition);
        expect(availableMoves.length).toBe(8);

        let targetPosition: Position = { row: 3, column: 2 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 1, column: 2 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 2, column: 3 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 2, column: 1 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 3, column: 3 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 1, column: 1 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 1, column: 3 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 3, column: 1 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);
    });

    it('should get the correct moves considering allies and enemies on the board', () => {
        board = Board.createCustomBoard({ rows: 5, columns: 5 });
        const initialPosition: Position = { row: 2, column: 2 };
        king = new King(PIECE_TEAM.WHITE, board, initialPosition);

        const enemyOnLine = new King(PIECE_TEAM.BLACK, board, { row: 3, column: 2 });
        const friendOnLine = new King(PIECE_TEAM.WHITE, board, { row: 2, column: 1 });

        const enemyOnDiagonal = new King(PIECE_TEAM.BLACK, board, { row: 3, column: 3 });
        const friendOnDiagonal = new King(PIECE_TEAM.WHITE, board, { row: 1, column: 1 });

        board.addPiecesToCustomBoard([king, enemyOnDiagonal, enemyOnLine, friendOnDiagonal, friendOnLine]);

        const availableMoves = king.getAvailableMoves(initialPosition);
        expect(availableMoves.length).toBe(6);

        let targetPosition: Position = enemyOnLine.getInitialPosition();
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = friendOnLine.getInitialPosition();
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(undefined);

        targetPosition = enemyOnDiagonal.getInitialPosition();
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = friendOnDiagonal.getInitialPosition();
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(undefined);

        targetPosition = { row: 1, column: 3 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 3, column: 1 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 2, column: 3 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 1, column: 2 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);
    });
});
