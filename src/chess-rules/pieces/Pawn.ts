import { Move } from './Move';
import { Piece, PIECE_TEAM } from './Piece';

export class Pawn extends Piece {
    public getSpecialMoves(): Array<Move> {
        throw new Error('Method not implemented.');
    }
    public getAvailableMoves(): Array<Move> {
        const availableMoves: Array<Move> = [];

        const board = this.getBoard();
        const currentPosition = this.getPosition();

        const pawnStep = this.getTeam() === PIECE_TEAM.WHITE ? 1 : -1;

        if (board.isPositionEmpty({
            ...currentPosition,
            row: currentPosition.row + pawnStep
        })) {
            const move = new Move(currentPosition, { row: currentPosition.row + pawnStep, column: currentPosition.column });
            availableMoves.push(move);
        }

        if (this.getInitialPosition() === this.getPosition() && board.isPositionEmpty({
            ...currentPosition,
            row: currentPosition.row + pawnStep * 2
        })) {
            const move = new Move(currentPosition, { row: currentPosition.row + pawnStep, column: currentPosition.column });
            availableMoves.push(move);
        }

        if (board.hasTeamEnemy(this.getTeam(), { row: currentPosition.row + pawnStep, column: currentPosition.column + 1 })) {
            const move = new Move(currentPosition, { row: currentPosition.row + pawnStep, column: currentPosition.column + 1 });
            availableMoves.push(move);
        }

        if (board.hasTeamEnemy(this.getTeam(), { row: currentPosition.row + pawnStep, column: currentPosition.column - 1 })) {
            const move = new Move(currentPosition, { row: currentPosition.row + pawnStep, column: currentPosition.column - 1 });
            availableMoves.push(move);
        }

        return this.filterMovesThatExposeTheKing(availableMoves);
    }
}
