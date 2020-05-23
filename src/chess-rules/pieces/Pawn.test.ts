import { Pawn } from './Pawn';
import { Board } from '../board/Board';
import { PIECE_TEAM } from './Piece';
import { Position, Move } from './Move';
import { isEqual } from 'lodash';

describe('Pawn piece tests', () => {
    let board: Board;
    let pawn: Pawn;

    it('should get the 2 top positions of the board on initial move when WHITE Pawn is alone', () => {

        board = Board.createCustomBoard({ rows: 3, columns: 3 });
        const initialPosition: Position = { row: 0, column: 0 };
        pawn = new Pawn(PIECE_TEAM.WHITE, board, initialPosition);
        board.addPiecesToCustomBoard([pawn]);

        const availableMoves = pawn.getAvailableMoves(initialPosition);
        expect(availableMoves.length).toBe(2);

        let targetPosition: Position = { row: 1, column: 0 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);


        targetPosition = { row: 2, column: 0 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

    });


    it('should get the 2 bottom positions of the board on initial move when BLACK Pawn is alone', () => {

        board = Board.createCustomBoard({ rows: 3, columns: 3 });
        const initialPosition: Position = { row: 2, column: 0 };
        pawn = new Pawn(PIECE_TEAM.BLACK, board, initialPosition);
        board.addPiecesToCustomBoard([pawn]);

        const availableMoves = pawn.getAvailableMoves(initialPosition);
        expect(availableMoves.length).toBe(2);

        let targetPosition: Position = { row: 1, column: 0 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);


        targetPosition = { row: 0, column: 0 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

    });

    it('should get only one movement when WHITE Pawn has moved', () => {
        board = Board.createCustomBoard({ rows: 4, columns: 4 });
        const initialPosition: Position = { row: 0, column: 0 };
        pawn = new Pawn(PIECE_TEAM.WHITE, board, initialPosition);
        board.addPiecesToCustomBoard([pawn]);

        let availableMoves = pawn.getAvailableMoves(initialPosition);
        const move = availableMoves.find((move) => isEqual(move.getStartPosition(), pawn.getInitialPosition()) &&
            isEqual(move.getEndPosition(), { row: 1, column: 0 }));

        if (move != null) {
            board.makeMove(pawn, move);
            availableMoves = pawn.getAvailableMoves(move.getEndPosition());
        } else {
            expect(move).toBeTruthy();
        }

        expect(availableMoves.length).toBe(1);
    });

    it('should get only one movement when BLACK Pawn has moved', () => {
        board = Board.createCustomBoard({ rows: 4, columns: 4 });
        const initialPosition: Position = { row: 3, column: 0 };
        pawn = new Pawn(PIECE_TEAM.BLACK, board, initialPosition);
        board.addPiecesToCustomBoard([pawn]);

        let availableMoves = pawn.getAvailableMoves(initialPosition);
        const move = availableMoves.find((move) => isEqual(move.getStartPosition(), pawn.getInitialPosition()) &&
            isEqual(move.getEndPosition(), { row: 2, column: 0 }));

        if (move != null) {
            board.makeMove(pawn, move);
            availableMoves = pawn.getAvailableMoves(move.getEndPosition());
        } else {
            expect(move).toBeTruthy();
        }

        expect(availableMoves.length).toBe(1);
    });


    it('should get movements on enemies on both sides when Pawn is WHITE', () => {
        board = Board.createCustomBoard({ rows: 3, columns: 3 });
        const initialPosition: Position = { row: 1, column: 1 };

        pawn = new Pawn(PIECE_TEAM.WHITE, board, initialPosition);
        const rightEnemy = new Pawn(PIECE_TEAM.BLACK, board, { row: 2, column: 2 });
        const leftEnemy = new Pawn(PIECE_TEAM.BLACK, board, { row: 2, column: 0 });
        board.addPiecesToCustomBoard([pawn, leftEnemy, rightEnemy]);

        const availableMoves = pawn.getAvailableMoves(initialPosition);
        expect(availableMoves.length).toBe(3);

        let targetPosition: Position = rightEnemy.getInitialPosition();
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = leftEnemy.getInitialPosition();
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 2, column: 1 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);
    });

    it('should get movements on enemies on both sides when Pawn is BLACK', () => {
        board = Board.createCustomBoard({ rows: 3, columns: 3 });
        const initialPosition: Position = { row: 1, column: 1 };

        pawn = new Pawn(PIECE_TEAM.BLACK, board, initialPosition);
        const rightEnemy = new Pawn(PIECE_TEAM.WHITE, board, { row: 0, column: 2 });
        const leftEnemy = new Pawn(PIECE_TEAM.WHITE, board, { row: 0, column: 0 });
        board.addPiecesToCustomBoard([pawn, leftEnemy, rightEnemy]);

        const availableMoves = pawn.getAvailableMoves(initialPosition);
        expect(availableMoves.length).toBe(3);

        let targetPosition: Position = rightEnemy.getInitialPosition();
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = leftEnemy.getInitialPosition();
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);

        targetPosition = { row: 0, column: 1 };
        expect(availableMoves.find((move) => isEqual(move.getStartPosition(), initialPosition) &&
            isEqual(move.getEndPosition(), targetPosition))?.getEndPosition()).toEqual(targetPosition);
    });

    it('should not walk on ally when Pawn is white', () => {
        board = Board.createCustomBoard({ rows: 5, columns: 5 });
        const initialPosition: Position = { row: 2, column: 2 };
        pawn = new Pawn(PIECE_TEAM.WHITE, board, initialPosition);

        const friend = new Pawn(PIECE_TEAM.WHITE, board, { row: 3, column: 2 });
        board.addPiecesToCustomBoard([pawn, friend]);

        const availableMoves = pawn.getAvailableMoves(initialPosition);
        expect(availableMoves.length).toBe(0);
    });

    it('should not walk on ally when Pawn is BLACK', () => {
        board = Board.createCustomBoard({ rows: 5, columns: 5 });
        const initialPosition: Position = { row: 2, column: 2 };
        pawn = new Pawn(PIECE_TEAM.BLACK, board, initialPosition);

        const friend = new Pawn(PIECE_TEAM.BLACK, board, { row: 1, column: 2 });
        board.addPiecesToCustomBoard([pawn, friend]);

        const availableMoves = pawn.getAvailableMoves(initialPosition);
        expect(availableMoves.length).toBe(0);
    });
});
