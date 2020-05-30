import { Move, Position } from './Move';
import { PieceWithRepeatedMove } from './PieceWithRepeatedMove';
import { BOARD_ELEMENT_NAME } from '../board/Board';

export class Bishop extends PieceWithRepeatedMove {
  public getName(): BOARD_ELEMENT_NAME {
    return BOARD_ELEMENT_NAME.BISHOP;
  }
  public getAvailableMoves(currentPosition: Position): Array<Move> {
    const availableMoves: Array<Move> = [];
    availableMoves.push(...this.getMovesWithStep(currentPosition, 1, 1));
    availableMoves.push(...this.getMovesWithStep(currentPosition, 1, -1));
    availableMoves.push(...this.getMovesWithStep(currentPosition, -1, 1));
    availableMoves.push(...this.getMovesWithStep(currentPosition, -1, -1));
    return availableMoves;
  }

  public getSpecialMoves(): Array<Move> {
    throw new Error('Method not implemented.');
  }
}
