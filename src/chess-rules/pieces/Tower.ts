import { Move, Position } from './Move';
import { PieceWithRepeatedMove } from './PieceWithRepeatedMove';
import { BOARD_ELEMENT_NAME } from '../board/Board';

export class Tower extends PieceWithRepeatedMove {
  public getName(): BOARD_ELEMENT_NAME {
    return BOARD_ELEMENT_NAME.TOWER;
  }

  public getAvailableMoves(currentPosition: Position): Array<Move> {
    const availableMoves: Array<Move> = [];
    availableMoves.push(...this.getMovesWithStep(currentPosition, 1, 0));
    availableMoves.push(...this.getMovesWithStep(currentPosition, -1, 0));
    availableMoves.push(...this.getMovesWithStep(currentPosition, 0, 1));
    availableMoves.push(...this.getMovesWithStep(currentPosition, 0, -1));
    return availableMoves;
  }
}
