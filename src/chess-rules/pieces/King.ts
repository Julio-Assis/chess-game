import { Move, Position } from './Move';
import { Piece } from './Piece';
import { BOARD_ELEMENT_NAME } from '../board/Board';

export class King extends Piece {
  public getName(): BOARD_ELEMENT_NAME {
    return BOARD_ELEMENT_NAME.KING;
  }
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

  private getMovesWithStep(currentPosition: Position, stepOnRows: number, stepOnColumns: number): Array<Move> {
    const availableMoves: Array<Move> = [];
    const board = this.getBoard();

    let candidatePosition: Position = {
      ...currentPosition,
      row: currentPosition.row + stepOnRows,
      column: currentPosition.column + stepOnColumns,
    };

    if (board.isPositionWithinTheTable(candidatePosition)) {
      if (board.hasTeamEnemy(this.getTeam(), candidatePosition) || board.isPositionEmpty(candidatePosition)) {
        const move = new Move(currentPosition, candidatePosition);
        availableMoves.push(move);
      }
    }

    return availableMoves;
  }
  public getSpecialMoves(): Array<Move> {
    throw new Error('Method not implemented.');
  }

}
