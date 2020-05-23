import { Move } from './Move';
import { Piece } from './Piece';

export class Pawn extends Piece {
    public getSpecialMoves(): Array<Move> {
        throw new Error('Method not implemented.');
    }
    public getAvailableMoves(): Array<Move> {
        const board = this.getBoard();
        this;
        throw new Error('Method not implemented.');
    }
}
