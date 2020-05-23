export interface Position {
    row: number;
    column: number;
}

export class Move {
    private startPosition: Position;
    private endPosition: Position;

    constructor(startPosition: Position, endPosition: Position) {
        this.startPosition = startPosition;
        this.endPosition = endPosition;
    }

    public getStartPosition(): Position {
        return this.startPosition;
    }

    public getEndPosition(): Position {
        return this.endPosition;
    }
}
