import { Move, Position } from './Move';
import { Piece } from './Piece';

export class King extends Piece {
    public getAvailableMoves(): Array<Move> {
        const availableMoves: Array<Move> = [];
        availableMoves.push(...this.getMovesWithStep(1, 1));
        availableMoves.push(...this.getMovesWithStep(1, -1));
        availableMoves.push(...this.getMovesWithStep(-1, 1));
        availableMoves.push(...this.getMovesWithStep(-1, -1));

        availableMoves.push(...this.getMovesWithStep(1, 0));
        availableMoves.push(...this.getMovesWithStep(-1, 0));
        availableMoves.push(...this.getMovesWithStep(0, 1));
        availableMoves.push(...this.getMovesWithStep(0, -1));

        return availableMoves;
    }

    private getMovesWithStep(stepOnRows: number, stepOnColumns: number): Array<Move> {
        const availableMoves: Array<Move> = [];
        const board = this.getBoard();

        const initialPosition = this.getInitialPosition();

        let candidatePosition: Position = {
            ...initialPosition,
            row: initialPosition.row + stepOnRows,
            column: initialPosition.column + stepOnColumns,
        };

        if (board.isPositionWithinTheTable(candidatePosition)) {
            if (board.hasTeamEnemy(this.getTeam(), candidatePosition) || board.isPositionEmpty(candidatePosition)) {
                const move = new Move(initialPosition, candidatePosition);
                availableMoves.push(move);
            }
        }

        return availableMoves;
    }
    public getSpecialMoves(): Array<Move> {
        throw new Error('Method not implemented.');
    }

}
