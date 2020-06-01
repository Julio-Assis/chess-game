import { Move, Position } from './Move';
import { Piece, PIECE_TEAM } from './Piece';
import { BOARD_ELEMENT_NAME } from '../board/Board';
import { isEqual } from 'lodash';

export class Pawn extends Piece {
  public getName(): BOARD_ELEMENT_NAME {
    return BOARD_ELEMENT_NAME.PAWN;
  }

  public getAvailableMoves(currentPosition: Position): Array<Move> {
    const availableMoves: Array<Move> = [];
    const board = this.getBoard();

    const pawnStep = this.getTeam() === PIECE_TEAM.WHITE ? 1 : -1;

    if (board.isPositionEmpty({
      ...currentPosition,
      row: currentPosition.row + pawnStep
    })) {
      const move = new Move(currentPosition, { row: currentPosition.row + pawnStep, column: currentPosition.column });
      availableMoves.push(move);

      if (isEqual(this.getInitialPosition(), currentPosition) && board.isPositionEmpty({
        ...currentPosition,
        row: currentPosition.row + pawnStep * 2
      })) {
        const move = new Move(currentPosition, { row: currentPosition.row + pawnStep * 2, column: currentPosition.column });
        availableMoves.push(move);
      }
    }

    if (board.hasTeamEnemy(this.getTeam(), { row: currentPosition.row + pawnStep, column: currentPosition.column + 1 })) {
      const move = new Move(currentPosition, { row: currentPosition.row + pawnStep, column: currentPosition.column + 1 });
      availableMoves.push(move);
    }

    if (board.hasTeamEnemy(this.getTeam(), { row: currentPosition.row + pawnStep, column: currentPosition.column - 1 })) {
      const move = new Move(currentPosition, { row: currentPosition.row + pawnStep, column: currentPosition.column - 1 });
      availableMoves.push(move);
    }

    return availableMoves;
  }
}
