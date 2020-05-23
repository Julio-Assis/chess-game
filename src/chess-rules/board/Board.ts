import { Piece, PIECE_TEAM } from '../pieces/Piece';
import { Tower } from '../pieces/Tower';
import { Knight } from '../pieces/Knight';
import { Bishop } from '../pieces/Bishop';
import { King } from '../pieces/King';
import { Queen } from '../pieces/Queen';
import { Pawn } from '../pieces/Pawn';
import { Position } from '../pieces/Move';

enum GAME_MODE {
    DEFAULT = 'DEFAULT',
}

type BoardElement = Piece | null | undefined;

export class Board {
    private mode: GAME_MODE;
    private boardTable: BoardElement[][];

    constructor(mode: GAME_MODE) {
        this.mode = mode;
        this.boardTable = [[]];
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

    private getBoardElement(position: Position): BoardElement {
        if (!this.isPositionWithinTheTable(position)) {
            throw new Error(`Provided position ${position} is outside of the table`);
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
        } else {
            throw new Error('Game mode not implemented');
        }
    };

    private createDefaultGame(): void {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                this.boardTable[row][col] = null;
            }
        }

        this.boardTable[0][0] = new Tower(PIECE_TEAM.WHITE, this, { row: 0, column: 0 });
        this.boardTable[0][1] = new Knight(PIECE_TEAM.WHITE, this, { row: 0, column: 1 });
        this.boardTable[0][2] = new Bishop(PIECE_TEAM.WHITE, this, { row: 0, column: 2 });
        this.boardTable[0][3] = new Queen(PIECE_TEAM.WHITE, this, { row: 0, column: 3 });
        this.boardTable[0][4] = new King(PIECE_TEAM.WHITE, this, { row: 0, column: 4 });
        this.boardTable[0][5] = new Bishop(PIECE_TEAM.WHITE, this, { row: 0, column: 5 });
        this.boardTable[0][6] = new Knight(PIECE_TEAM.WHITE, this, { row: 0, column: 6 });
        this.boardTable[0][7] = new Tower(PIECE_TEAM.WHITE, this, { row: 0, column: 7 });

        this.boardTable[1][0] = new Pawn(PIECE_TEAM.WHITE, this, { row: 1, column: 0 });
        this.boardTable[1][1] = new Pawn(PIECE_TEAM.WHITE, this, { row: 1, column: 1 });
        this.boardTable[1][2] = new Pawn(PIECE_TEAM.WHITE, this, { row: 1, column: 2 });
        this.boardTable[1][3] = new Pawn(PIECE_TEAM.WHITE, this, { row: 1, column: 3 });
        this.boardTable[1][4] = new Pawn(PIECE_TEAM.WHITE, this, { row: 1, column: 4 });
        this.boardTable[1][5] = new Pawn(PIECE_TEAM.WHITE, this, { row: 1, column: 5 });
        this.boardTable[1][6] = new Pawn(PIECE_TEAM.WHITE, this, { row: 1, column: 6 });
        this.boardTable[1][7] = new Pawn(PIECE_TEAM.WHITE, this, { row: 1, column: 7 });

        this.boardTable[6][0] = new Pawn(PIECE_TEAM.BLACK, this, { row: 6, column: 0 });
        this.boardTable[6][1] = new Pawn(PIECE_TEAM.BLACK, this, { row: 6, column: 1 });
        this.boardTable[6][2] = new Pawn(PIECE_TEAM.BLACK, this, { row: 6, column: 2 });
        this.boardTable[6][3] = new Pawn(PIECE_TEAM.BLACK, this, { row: 6, column: 3 });
        this.boardTable[6][4] = new Pawn(PIECE_TEAM.BLACK, this, { row: 6, column: 4 });
        this.boardTable[6][5] = new Pawn(PIECE_TEAM.BLACK, this, { row: 6, column: 5 });
        this.boardTable[6][6] = new Pawn(PIECE_TEAM.BLACK, this, { row: 6, column: 6 });
        this.boardTable[6][7] = new Pawn(PIECE_TEAM.BLACK, this, { row: 6, column: 7 });

        this.boardTable[7][0] = new Tower(PIECE_TEAM.BLACK, this, { row: 7, column: 0 });
        this.boardTable[7][1] = new Knight(PIECE_TEAM.BLACK, this, { row: 7, column: 1 });
        this.boardTable[7][2] = new Bishop(PIECE_TEAM.BLACK, this, { row: 7, column: 2 });
        this.boardTable[7][3] = new Queen(PIECE_TEAM.BLACK, this, { row: 7, column: 3 });
        this.boardTable[7][4] = new King(PIECE_TEAM.BLACK, this, { row: 7, column: 4 });
        this.boardTable[7][5] = new Bishop(PIECE_TEAM.BLACK, this, { row: 7, column: 5 });
        this.boardTable[7][6] = new Knight(PIECE_TEAM.BLACK, this, { row: 7, column: 6 });
        this.boardTable[7][7] = new Tower(PIECE_TEAM.BLACK, this, { row: 7, column: 7 });
    }

    public getTable(): BoardElement[][] {
        return this.boardTable;
    }
}
