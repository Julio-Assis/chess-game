import * as React from 'react';
import { createStyles } from '../shared/utils';
import { css } from 'emotion';
import { ChessIconUnicode } from '../constants/ChessIconUnicode';

export type BoardSquareProps = Readonly<{
  color: 'white' | 'black';
  icon?: ChessIconUnicode | null | undefined;
  size?: 'medium' | 'large';
}>;

export function BoardSquare({
  color,
  icon,
  size = 'medium',
}: BoardSquareProps) {
  return (
    <div
      className={css(
        color === 'white'
          ? styles.whiteSquareContainer
          : styles.blackSquareContainer,
        styles.rootContainer
      )}
    >
      {icon && (
        <span
          dangerouslySetInnerHTML={{ __html: icon }}
          className={css(
            size === 'medium' ? styles.mediumIcon : styles.largeIcon,
            styles.baseIcon
          )}
        />
      )}
    </div>
  );
}

const SQUARE_SIZE = 50;
const styles = createStyles({
  rootContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteSquareContainer: {
    backgroundColor: 'white',
    border: '1px solid white',
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
  },
  blackSquareContainer: {
    backgroundColor: 'gray',
    border: '1px solid white',
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
  },
  mediumIcon: {
    fontSize: '32px',
  },
  largeIcon: {
    fontSize: '48px',
  },
  baseIcon: {
    cursor: 'pointer',
  },
});
