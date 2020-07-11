import { Piece, PIECE_TEAM } from '../pieces/Piece';
import { Tower } from '../pieces/Tower';
import { Knight } from '../pieces/Knight';
import { Bishop } from '../pieces/Bishop';
import { King } from '../pieces/King';
import { Queen } from '../pieces/Queen';
import { Pawn } from '../pieces/Pawn';
import { Position, Move } from '../pieces/Move';
import { nullThrows } from '../../shared/nullThrows';
import { isEqual } from 'lodash';

export enum GAME_MODE {
  DEFAULT = 'DEFAULT',
  CUSTOM = 'CUSTOM',
}

export enum BOARD_ELEMENT_NAME {
  EMPTY = 'EMPTY',
  PAWN = 'PAWN',
  BISHOP = 'BISHOP',
  KNIGHT = 'KNIGHT',
  KING = 'KING',
  QUEEN = 'QUEEN',
  TOWER = 'TOWER',
}

type BoardElement = Piece | null | undefined;
type RecordedMove = { piece: Piece, move: Move, endPositionOldElement: BoardElement; };

export class Board {
  private mode: GAME_MODE;
  private boardTable: BoardElement[][];
  private whiteTeam: Map<Piece, Position>;
  private blackTeam: Map<Piece, Position>;
  private recordedMoves: Array<RecordedMove>;
  private availableMoves: Move[];
  private activePiece: Piece | undefined;

  constructor(mode: GAME_MODE) {
    this.mode = mode;
    this.boardTable = [];
    this.whiteTeam = new Map<Piece, Position>();
    this.blackTeam = new Map<Piece, Position>();
    this.recordedMoves = [];
    this.availableMoves = [];
    this.createGame();
  }

  public isPositionWithinTheTable(position: Position): boolean {
    const tableRows = this.boardTable.length;
    const tableColumns = this.boardTable.length > 0 ? this.boardTable[0].length : 0;
    const isRowValid = position.row < tableRows && position.row >= 0;
    const isColumnValid = position.column < tableColumns && position.column >= 0;
    return isRowValid && isColumnValid;
  }

  public isPositionEmpty(position: Position): boolean {
    if (this.isPositionWithinTheTable(position)) {
      return this.getBoardElement(position) == null;
    }

    return false;
  }

  public getElementName(position: Position): { team?: PIECE_TEAM, name: BOARD_ELEMENT_NAME; } | null {
    if (!this.isPositionWithinTheTable(position)) {
      return null;
    }

    if (this.isPositionEmpty(position)) {
      return { name: BOARD_ELEMENT_NAME.EMPTY };
    }

    const boardElement = nullThrows(this.getBoardElement(position));

    return {
      team: boardElement.getTeam(),
      name: boardElement.getName(),
    };
  }

  private getBoardElement(position: Position): BoardElement {
    if (!this.isPositionWithinTheTable(position)) {
      return null;
    }

    return this.boardTable[position.row][position.column];
  }

  public hasTeamEnemy(team: PIECE_TEAM, position: Position): boolean {
    const boardElement = this.getBoardElement(position);
    if (boardElement != null) {
      return boardElement.getTeam() !== team;
    }

    return false;
  }

  public hasTeamFriend(team: PIECE_TEAM, position: Position): boolean {
    const boardElement = this.getBoardElement(position);
    if (boardElement != null) {
      return boardElement.getTeam() === team;
    }

    return false;
  }

  private createGame(): void {
    if (this.mode === GAME_MODE.DEFAULT) {
      this.createDefaultGame();
    } else if (this.mode === GAME_MODE.CUSTOM) {

    } else {
      throw new Error('Game mode not implemented');
    }
  };

  public static createCustomBoard(boardDimensions: { rows: number, columns: number; }): Board {
    const board = new this(GAME_MODE.CUSTOM);
    board.initBoardTable(boardDimensions);
    return board;
  }

  private initBoardTable(boardDimensions: { rows: number, columns: number; }) {
    for (let row = 0; row < boardDimensions.rows; row++) {
      this.boardTable[row] = [];
      for (let col = 0; col < boardDimensions.columns; col++) {
        this.boardTable[row].push(null);
      }
    }
  }

  public addPiecesToCustomBoard(pieces: Array<Piece>) {
    if (this.mode === GAME_MODE.CUSTOM) {
      this.addPiecesToBoard(pieces);
    }
  }

  private addPiecesToBoard(pieces: Array<Piece>) {
    for (const piece of pieces) {
      const initialPosition = piece.getInitialPosition();
      this.boardTable[initialPosition.row][initialPosition.column] = piece;
    }

    this.assignTeams();
  }

  public isAvailableMove(position: Position): boolean {
    return this.availableMoves.findIndex((move) => isEqual(move.getEndPosition(), position)) >= 0;
  }

  public executeBoardAction(position: Position): void {
    if (this.isAvailableMove(position)) {
      const piece = nullThrows(this.activePiece);
      const team = this.getPieceTeam(piece);
      this.makeMove(piece, new Move(nullThrows(team.get(piece)), position));
      this.availableMoves = [];
      return;
    }

    if (this.isPositionEmpty(position) || !this.isPositionWithinTheTable) {
      this.availableMoves = [];
      return;
    }

    this.setAvailableMoves(position);
  }

  private setAvailableMoves(position: Position) {

    if (!this.isPositionWithinTheTable(position) || this.isPositionEmpty(position)) {
      return null;
    }

    const piece = nullThrows(this.getBoardElement(position));

    this.activePiece = piece;
    this.availableMoves = this.filterMovesThatExposeTheKing(this.activePiece, piece.getAvailableMoves(position));
  }

  private filterMovesThatExposeTheKing(piece: Piece, moves: Array<Move>): Array<Move> {

    const friendKing = nullThrows(Array.from(this.getPieceTeam(piece).keys()).find((piece) => piece.getName() === BOARD_ELEMENT_NAME.KING));
    return moves.filter((move) => {
      this.makeMove(piece, move);

      const kingPosition = this.getPieceTeam(friendKing).get(friendKing) as Position;
      const isKingInThreat = this.isPositionInThreat(friendKing.getTeam(), kingPosition);

      this.revertLastMove();

      return !isKingInThreat;
    });
  }

  public isPositionInThreat(team: PIECE_TEAM, position: Position): boolean {
    const oppositeTeam = this.getTeam(team, true);
    const oppositeTeamPieces = Array.from(oppositeTeam.keys());

    const pieceThreatening = oppositeTeamPieces.find((piece) => {
      const piecePosition = oppositeTeam.get(piece) as Position;
      const threatMove = piece.getAvailableMoves(piecePosition).find((move) => isEqual(move.getEndPosition(), position));
      return threatMove != null;
    });

    return pieceThreatening != null;
  }

  private getPieceTeam(piece: Piece, opposite: boolean = false): Map<Piece, Position> {
    return this.getTeam(piece.getTeam(), opposite);
  }

  private getTeam(team: PIECE_TEAM, opposite: boolean = false): Map<Piece, Position> {
    if (opposite) {
      return team === PIECE_TEAM.WHITE ? this.blackTeam : this.whiteTeam;
    }
    return team === PIECE_TEAM.WHITE ? this.whiteTeam : this.blackTeam;
  }

  private makeMove(piece: Piece, move: Move) {
    if (this.isRockMove(piece, move)) {
      return this.makeRockMove(piece as King, move);
    }

    const startPosition = move.getStartPosition();
    const endPosition = move.getEndPosition();

    const currentElementOnEnd = this.getBoardElement(endPosition);
    this.boardTable[endPosition.row][endPosition.column] = piece;
    this.boardTable[startPosition.row][startPosition.column] = null;

    const pieceTeam = this.getPieceTeam(piece);
    const oppositeTeam = this.getPieceTeam(piece, true);

    pieceTeam.set(piece, endPosition);

    if (currentElementOnEnd != null) {
      oppositeTeam.delete(currentElementOnEnd);
    }

    this.recordedMoves.push({
      piece,
      move,
      endPositionOldElement: currentElementOnEnd,
    });
  }

  private isRockMove(piece: Piece, move: Move): boolean {
    return piece.getName() === BOARD_ELEMENT_NAME.KING &&
      Math.abs(move.getEndPosition().column - move.getStartPosition().column) > 1;
  }

  private makeRockMove(king: King, move: Move): void {
    const team = this.getPieceTeam(king);

    const kingStartPosition = move.getStartPosition();
    const kingEndPosition = move.getEndPosition();

    const towerStartPosition: Position = {
      row: kingStartPosition.row,
      column: kingEndPosition.column - kingStartPosition.column > 0 ?
        kingEndPosition.column + 1 :
        kingEndPosition.column - 2,
    };

    const towerEndPosition = {
      ...towerStartPosition,
      column: kingEndPosition.column - kingStartPosition.column > 0 ?
        towerStartPosition.column - 2 :
        towerStartPosition.column + 3,
    };

    const tower = nullThrows(this.getBoardElement(towerStartPosition));

    this.boardTable[kingEndPosition.row][kingEndPosition.column] = king;
    this.boardTable[kingStartPosition.row][kingStartPosition.column] = null;


    this.boardTable[towerEndPosition.row][towerEndPosition.column] = tower;
    this.boardTable[towerStartPosition.row][towerStartPosition.column] = null;

    team.set(tower, towerEndPosition);
    team.set(king, kingEndPosition);

    this.recordedMoves.push({
      piece: king,
      move,
      endPositionOldElement: tower,
    });
  }

  public revertLastMove(): void {
    if (this.recordedMoves.length === 0) {
      return;
    }
    const lastMove = nullThrows(this.recordedMoves.pop());

    if (this.isRockMove(lastMove.piece, lastMove.move)) {
      return this.revertRockMove(lastMove);
    }

    const startPosition = lastMove.move.getStartPosition();
    const endPosition = lastMove.move.getEndPosition();

    const movedPiece = lastMove.piece;
    const endPositionOldElement = lastMove.endPositionOldElement;

    this.boardTable[startPosition.row][startPosition.column] = movedPiece;
    this.boardTable[endPosition.row][endPosition.column] = endPositionOldElement;

    const pieceTeam = this.getPieceTeam(movedPiece);
    pieceTeam.set(movedPiece, startPosition);

    if (endPositionOldElement != null) {
      const oldElementTeam = this.getPieceTeam(endPositionOldElement);
      oldElementTeam.set(endPositionOldElement, endPosition);
    }
  }

  private revertRockMove(lastMove: RecordedMove): void {
    const king = lastMove.piece;
    const tower = lastMove.piece;
    const move = lastMove.move;

    const kingStartPosition = move.getStartPosition();
    const kingEndPosition = move.getEndPosition();

    const team = this.getPieceTeam(king);

    this.boardTable[kingEndPosition.row][kingEndPosition.column] = null;
    this.boardTable[kingStartPosition.row][kingStartPosition.column] = king;
    team.set(king, kingStartPosition);

    const towerStartPosition: Position = {
      row: kingStartPosition.row,
      column: kingEndPosition.column - kingStartPosition.column > 0 ?
        kingEndPosition.column + 1 :
        kingEndPosition.column - 2,
    };

    const towerEndPosition = {
      ...towerStartPosition,
      column: kingEndPosition.column - kingStartPosition.column > 0 ?
        towerStartPosition.column - 2 :
        towerStartPosition.column + 3,
    };

    this.boardTable[towerEndPosition.row][towerEndPosition.column] = null;
    this.boardTable[towerStartPosition.row][towerStartPosition.column] = tower;
    team.set(tower, towerStartPosition);
  }

  private assignTeams(): void {
    const tableRows = this.boardTable.length;
    const tableColumns = this.boardTable.length > 0 ? this.boardTable[0].length : 0;

    for (let row = 0; row < tableRows; row++) {
      for (let column = 0; column < tableColumns; column++) {
        const boardElement = this.getBoardElement({ row, column });
        if (boardElement != null) {
          this.assignTeam(boardElement, { row, column });
        }
      }
    }
  }

  private assignTeam(boardElement: Piece, position: Position): void {
    if (boardElement.getTeam() === PIECE_TEAM.WHITE) {
      this.whiteTeam.set(boardElement, position);
    } else {
      this.blackTeam.set(boardElement, position);
    }
  }

  public getTable(): BoardElement[][] {
    return this.boardTable;
  }

  private createDefaultGame(): void {
    this.initBoardTable({ rows: 8, columns: 8 });

    this.addPiecesToBoard([
      new Tower(PIECE_TEAM.WHITE, this, { row: 0, column: 0 }),
      new Knight(PIECE_TEAM.WHITE, this, { row: 0, column: 1 }),
      new Bishop(PIECE_TEAM.WHITE, this, { row: 0, column: 2 }),
      new Queen(PIECE_TEAM.WHITE, this, { row: 0, column: 3 }),
      new King(PIECE_TEAM.WHITE, this, { row: 0, column: 4 }),
      new Bishop(PIECE_TEAM.WHITE, this, { row: 0, column: 5 }),
      new Knight(PIECE_TEAM.WHITE, this, { row: 0, column: 6 }),
      new Tower(PIECE_TEAM.WHITE, this, { row: 0, column: 7 }),
      new Pawn(PIECE_TEAM.WHITE, this, { row: 1, column: 0 }),
      new Pawn(PIECE_TEAM.WHITE, this, { row: 1, column: 1 }),
      new Pawn(PIECE_TEAM.WHITE, this, { row: 1, column: 2 }),
      new Pawn(PIECE_TEAM.WHITE, this, { row: 1, column: 3 }),
      new Pawn(PIECE_TEAM.WHITE, this, { row: 1, column: 4 }),
      new Pawn(PIECE_TEAM.WHITE, this, { row: 1, column: 5 }),
      new Pawn(PIECE_TEAM.WHITE, this, { row: 1, column: 6 }),
      new Pawn(PIECE_TEAM.WHITE, this, { row: 1, column: 7 }),

      new Pawn(PIECE_TEAM.BLACK, this, { row: 6, column: 0 }),
      new Pawn(PIECE_TEAM.BLACK, this, { row: 6, column: 1 }),
      new Pawn(PIECE_TEAM.BLACK, this, { row: 6, column: 2 }),
      new Pawn(PIECE_TEAM.BLACK, this, { row: 6, column: 3 }),
      new Pawn(PIECE_TEAM.BLACK, this, { row: 6, column: 4 }),
      new Pawn(PIECE_TEAM.BLACK, this, { row: 6, column: 5 }),
      new Pawn(PIECE_TEAM.BLACK, this, { row: 6, column: 6 }),
      new Pawn(PIECE_TEAM.BLACK, this, { row: 6, column: 7 }),
      new Tower(PIECE_TEAM.BLACK, this, { row: 7, column: 0 }),
      new Knight(PIECE_TEAM.BLACK, this, { row: 7, column: 1 }),
      new Bishop(PIECE_TEAM.BLACK, this, { row: 7, column: 2 }),
      new Queen(PIECE_TEAM.BLACK, this, { row: 7, column: 3 }),
      new King(PIECE_TEAM.BLACK, this, { row: 7, column: 4 }),
      new Bishop(PIECE_TEAM.BLACK, this, { row: 7, column: 5 }),
      new Knight(PIECE_TEAM.BLACK, this, { row: 7, column: 6 }),
      new Tower(PIECE_TEAM.BLACK, this, { row: 7, column: 7 }),
    ]);

    this.assignTeams();
  }
}
