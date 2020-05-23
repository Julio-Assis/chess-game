import { Move, Position } from './Move';
import { Piece } from './Piece';

export class Knight extends Piece {
    public getAvailableMoves(): Array<Move> {
        const availableMoves: Array<Move> = [];
        const currentPosition = this.getPosition();

        availableMoves.push(...this.getValidMove({
            ...currentPosition,
            row: currentPosition.row + 2,
            column: currentPosition.column + 1,
        }));

        availableMoves.push(...this.getValidMove({
            ...currentPosition,
            row: currentPosition.row + 2,
            column: currentPosition.column - 1,
        }));

        availableMoves.push(...this.getValidMove({
            ...currentPosition,
            row: currentPosition.row - 2,
            column: currentPosition.column + 1,
        }));

        availableMoves.push(...this.getValidMove({
            ...currentPosition,
            row: currentPosition.row - 2,
            column: currentPosition.column - 1,
        }));

        availableMoves.push(...this.getValidMove({
            ...currentPosition,
            row: currentPosition.row + 1,
            column: currentPosition.column + 2,
        }));

        availableMoves.push(...this.getValidMove({
            ...currentPosition,
            row: currentPosition.row + 1,
            column: currentPosition.column - 2,
        }));

        availableMoves.push(...this.getValidMove({
            ...currentPosition,
            row: currentPosition.row - 1,
            column: currentPosition.column + 2,
        }));

        availableMoves.push(...this.getValidMove({
            ...currentPosition,
            row: currentPosition.row - 1,
            column: currentPosition.column - 2,
        }));

        return availableMoves;
    }

    private getValidMove(position: Position): Array<Move> {
        const validMoves: Array<Move> = [];
        const board = this.getBoard();

        if (!board.isPositionWithinTheTable(position)) {
            return validMoves;
        }

        if (board.hasTeamFriend(this.getTeam(), position)) {
            return validMoves;
        }

        const move = new Move(this.getPosition(), position);
        validMoves.push(move);
        return validMoves;
    }

    public getSpecialMoves(): Array<Move> {
        throw new Error('Method not implemented.');
    }
}
