import { Board, BOARD_ELEMENT_NAME } from '../board/Board';
import { Move, Position } from './Move';

export enum PIECE_TEAM {
  WHITE = 'WHITE',
  BLACK = 'BLACK',
}

export abstract class Piece {
  private team: PIECE_TEAM;
  private board: Board;
  private initialPosition: Position;

  constructor(team: PIECE_TEAM, board: Board, initialPosition: Position) {
    this.team = team;
    this.board = board;
    this.initialPosition = initialPosition;
  }

  public abstract getName(): BOARD_ELEMENT_NAME;

  public getTeam(): PIECE_TEAM {
    return this.team;
  }

  public getBoard(): Board {
    return this.board;
  }

  public getInitialPosition(): Position {
    return this.initialPosition;
  }

  public abstract getAvailableMoves(currentPosition: Position): Array<Move>;
}
