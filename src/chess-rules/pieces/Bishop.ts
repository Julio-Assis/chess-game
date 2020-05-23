import { Move } from './Move';
import { PieceWithRepeatedMove } from './PieceWithRepeatedMove';

export class Bishop extends PieceWithRepeatedMove {
    public getAvailableMoves(): Array<Move> {
        const availableMoves: Array<Move> = [];
        availableMoves.push(...this.getMovesWithStep(1, 1));
        availableMoves.push(...this.getMovesWithStep(1, -1));
        availableMoves.push(...this.getMovesWithStep(-1, 1));
        availableMoves.push(...this.getMovesWithStep(-1, -1));
        return availableMoves;
    }

    public getSpecialMoves(): Array<Move> {
        throw new Error('Method not implemented.');
    }
}
