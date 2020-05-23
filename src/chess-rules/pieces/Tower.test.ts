import { Tower } from './Tower';
import { Board } from '../board/Board';
import { PIECE_TEAM } from './Piece';
import { Position } from './Move';
import { isEqual } from 'lodash';

describe('Tower piece tests', () => {
    let board: Board;
    let tower: Tower;

    it('should get the up and right positions of the board when it is alone', () => {

        board = Board.createCustomBoard({ rows: 2, columns: 2 });
        const initialPosition: Position = { row: 0, column: 0 };
        tower = new Tower(PIECE_TEAM.WHITE, board, initialPosition);
        board.addPiecesToCustomBoard([tower]);

        const availableMoves = tower.getAvailableMoves(initialPosition);
        expect(availableMoves.length).toBe(2);

        let targetPosition: Position = { row: 1, column: 0 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 0, column: 1 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);
    });

    it('should get all the four targetPositions when Tower is in the middle', () => {
        board = Board.createCustomBoard({ rows: 3, columns: 3 });
        const initialPosition: Position = { row: 1, column: 1 };
        tower = new Tower(PIECE_TEAM.BLACK, board, initialPosition);
        board.addPiecesToCustomBoard([tower]);

        const availableMoves = tower.getAvailableMoves(initialPosition);
        expect(availableMoves.length).toBe(4);

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
    });


    it('should get all the four targetPositions when Tower is in the middle on larger board', () => {
        board = Board.createCustomBoard({ rows: 5, columns: 5 });
        const initialPosition: Position = { row: 2, column: 2 };
        tower = new Tower(PIECE_TEAM.BLACK, board, initialPosition);
        board.addPiecesToCustomBoard([tower]);

        const availableMoves = tower.getAvailableMoves(initialPosition);
        expect(availableMoves.length).toBe(8);

        let targetPosition: Position = { row: 4, column: 2 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 0, column: 2 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 2, column: 4 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 2, column: 0 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);
    });

    it('should get the correct moves considering allies and enemies on the board', () => {
        board = Board.createCustomBoard({ rows: 5, columns: 5 });
        const initialPosition: Position = { row: 2, column: 2 };
        tower = new Tower(PIECE_TEAM.WHITE, board, initialPosition);

        const enemy = new Tower(PIECE_TEAM.BLACK, board, { row: 3, column: 2 });
        const friend = new Tower(PIECE_TEAM.WHITE, board, { row: 2, column: 1 });
        board.addPiecesToCustomBoard([tower, enemy, friend]);

        const availableMoves = tower.getAvailableMoves(initialPosition);
        expect(availableMoves.length).toBe(5);

        let targetPosition: Position = enemy.getInitialPosition();
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = friend.getInitialPosition();
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(undefined);

        targetPosition = { row: 2, column: 4 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 0, column: 2 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);
    });
});
