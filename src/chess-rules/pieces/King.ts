import { Move } from './Move';
import { Piece } from './Piece';

export class King extends Piece {
    public getAvailableMoves(): Array<Move> {
        throw new Error('Method not implemented.');
    }
    public getSpecialMoves(): Array<Move> {
        throw new Error('Method not implemented.');
    }

}
