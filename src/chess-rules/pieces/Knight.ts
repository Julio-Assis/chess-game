import { Move } from './Move';
import { Piece } from './Piece';

export class Knight extends Piece {
    public getAvailableMoves(): Array<Move> {
        this;
        throw new Error('Method not implemented.');
    }
    public getSpecialMoves(): Array<Move> {
        throw new Error('Method not implemented.');
    }
}
