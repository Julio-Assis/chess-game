import { Move, Position } from './Move';
import { Piece } from './Piece';
import { BOARD_ELEMENT_NAME } from '../board/Board';

export class Knight extends Piece {
  public getName(): BOARD_ELEMENT_NAME {
    return BOARD_ELEMENT_NAME.KNIGHT;
  }
  public getAvailableMoves(currentPosition: Position): Array<Move> {
    const availableMoves: Array<Move> = [];

    availableMoves.push(...this.getValidMove(currentPosition, {
      ...currentPosition,
      row: currentPosition.row + 2,
      column: currentPosition.column + 1,
    }));

    availableMoves.push(...this.getValidMove(currentPosition, {
      ...currentPosition,
      row: currentPosition.row + 2,
      column: currentPosition.column - 1,
    }));

    availableMoves.push(...this.getValidMove(currentPosition, {
      ...currentPosition,
      row: currentPosition.row - 2,
      column: currentPosition.column + 1,
    }));

    availableMoves.push(...this.getValidMove(currentPosition, {
      ...currentPosition,
      row: currentPosition.row - 2,
      column: currentPosition.column - 1,
    }));

    availableMoves.push(...this.getValidMove(currentPosition, {
      ...currentPosition,
      row: currentPosition.row + 1,
      column: currentPosition.column + 2,
    }));

    availableMoves.push(...this.getValidMove(currentPosition, {
      ...currentPosition,
      row: currentPosition.row + 1,
      column: currentPosition.column - 2,
    }));

    availableMoves.push(...this.getValidMove(currentPosition, {
      ...currentPosition,
      row: currentPosition.row - 1,
      column: currentPosition.column + 2,
    }));

    availableMoves.push(...this.getValidMove(currentPosition, {
      ...currentPosition,
      row: currentPosition.row - 1,
      column: currentPosition.column - 2,
    }));

    return availableMoves;
  }

  private getValidMove(currentPosition: Position, targetPosition: Position): Array<Move> {
    const validMoves: Array<Move> = [];
    const board = this.getBoard();

    if (!board.isPositionWithinTheTable(targetPosition)) {
      return validMoves;
    }

    if (board.hasTeamFriend(this.getTeam(), targetPosition)) {
      return validMoves;
    }

    const move = new Move(currentPosition, targetPosition);
    validMoves.push(move);
    return validMoves;
  }

  public getSpecialMoves(): Array<Move> {
    throw new Error('Method not implemented.');
  }
}
