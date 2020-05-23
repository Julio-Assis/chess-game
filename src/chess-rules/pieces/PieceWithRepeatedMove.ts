import { Piece } from './Piece';
import { Move, Position } from './Move';

export abstract class PieceWithRepeatedMove extends Piece {
    protected getMovesWithStep(stepOnRows: number, stepOnColumns: number): Array<Move> {
        const availableMoves: Array<Move> = [];
        const board = this.getBoard();

        const initialPosition = this.getInitialPosition();

        let candidatePosition: Position = {
            ...initialPosition,
            row: initialPosition.row + stepOnRows,
            column: initialPosition.column + stepOnColumns,
        };

        while (board.isPositionWithinTheTable(candidatePosition)) {
            const move = new Move(initialPosition, candidatePosition);
            if (board.hasTeamFriend(this.getTeam(), candidatePosition)) {
                break;
            }

            if (board.hasTeamEnemy(this.getTeam(), candidatePosition)) {
                availableMoves.push(move);
                break;
            }

            availableMoves.push(move);
            candidatePosition = {
                row: candidatePosition.row + stepOnRows,
                column: candidatePosition.column + stepOnRows,
            };
        }

        return availableMoves;
    }
}
