import { Move, Position } from './Move';
import { PieceWithRepeatedMove } from './PieceWithRepeatedMove';

export class Queen extends PieceWithRepeatedMove {
    public getAvailableMoves(currentPosition: Position): Array<Move> {
        const availableMoves: Array<Move> = [];
        availableMoves.push(...this.getMovesWithStep(currentPosition, 1, 1));
        availableMoves.push(...this.getMovesWithStep(currentPosition, 1, -1));
        availableMoves.push(...this.getMovesWithStep(currentPosition, -1, 1));
        availableMoves.push(...this.getMovesWithStep(currentPosition, -1, -1));

        availableMoves.push(...this.getMovesWithStep(currentPosition, 1, 0));
        availableMoves.push(...this.getMovesWithStep(currentPosition, -1, 0));
        availableMoves.push(...this.getMovesWithStep(currentPosition, 0, 1));
        availableMoves.push(...this.getMovesWithStep(currentPosition, 0, -1));
        return availableMoves;
    }

    public getSpecialMoves(): Array<Move> {
        throw new Error('Method not implemented.');
    }
}
