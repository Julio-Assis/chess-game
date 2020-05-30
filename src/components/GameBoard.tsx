import * as React from 'react';
import { useEffect, useState } from 'react';
import { createStyles } from '../shared/utils';
import { css } from 'emotion';
import {
  ChessIconUnicode,
  ChessIconUnicodeKeys,
} from '../constants/ChessIconUnicode';
import { BoardSquare, BoardSquareProps } from './BoardSquare';
import {
  Board,
  GAME_MODE,
  BOARD_ELEMENT_NAME,
} from '../chess-rules/board/Board';
import { PIECE_TEAM } from '../chess-rules/pieces/Piece';
import { nullThrows } from '../shared/nullThrows';

type Props = Readonly<{
  dimensions?: { rows: number; columns: number };
}>;

function getIcon(name: BOARD_ELEMENT_NAME, team: PIECE_TEAM): ChessIconUnicode {
  for (const enumMember in ChessIconUnicode) {
    if (enumMember === `${team}_${name}`) {
      return ChessIconUnicode[enumMember as ChessIconUnicodeKeys];
    }
  }
  throw Error(`Invalid name or team, received name=${name} and team=${team}`);
}

export function GameBoard({ dimensions = { rows: 8, columns: 8 } }: Props) {
  const [hasChanges, setHasChanges] = useState(false);
  const [boardRules, _] = useState(new Board(GAME_MODE.DEFAULT));

  useEffect(() => {
    if (hasChanges) {
      setHasChanges(false);
    }
  }, [hasChanges]);

  function renderBoard() {
    const board = [];
    for (let row = dimensions.rows - 1; row >= 0; row--) {
      const squaresTypes: BoardSquareProps['color'][] = ['black', 'white'];
      const Squares = [];

      for (let column = 0; column < dimensions.columns; column++) {
        const color = squaresTypes[(column + row) % 2];
        const elementName = boardRules.getElementName({ row, column });
        let icon;
        if (elementName == null) {
          icon = null;
        } else if (boardRules.isAvailableMove({ row, column })) {
          icon = ChessIconUnicode.BULLET;
        } else if (elementName.name === BOARD_ELEMENT_NAME.EMPTY) {
          icon = null;
        } else {
          icon = getIcon(elementName.name, nullThrows(elementName.team));
        }

        Squares.push(
          <BoardSquare
            key={`row${row}-column${column}`}
            color={color}
            icon={icon}
            onClick={() => {
              boardRules.executeBoardAction({ row, column });
              setHasChanges(true);
            }}
          />
        );
      }

      board.push(
        <div key={`row${row}`} className={css(styles.rowRootContainer)}>
          {Squares}
        </div>
      );
    }

    console.log(boardRules.getTable());

    return <div className={css(styles.rootContainer)}>{board}</div>;
  }

  return renderBoard();
}

const styles = createStyles({
  rootContainer: {
    border: '4px solid brown',
    display: 'inline-block',
    margin: '4px',
  },
  rowRootContainer: {
    display: 'flex',
  },
});
