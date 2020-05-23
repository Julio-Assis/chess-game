import { Piece } from './Piece';
import { Move, Position } from './Move';

export abstract class PieceWithRepeatedMove extends Piece {
    protected getMovesWithStep(currentPosition: Position, stepOnRows: number, stepOnColumns: number): Array<Move> {
        const availableMoves: Array<Move> = [];
        const board = this.getBoard();

        let candidatePosition: Position = {
            ...currentPosition,
            row: currentPosition.row + stepOnRows,
            column: currentPosition.column + stepOnColumns,
        };

        while (board.isPositionWithinTheTable(candidatePosition)) {
            const move = new Move(currentPosition, candidatePosition);
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
                column: candidatePosition.column + stepOnColumns,
            };
        }

        return availableMoves;
    }
}
