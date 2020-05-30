import * as React from 'react';
import { GameBoard } from './components/GameBoard';

type Props = Readonly<{}>;

export function Home(props: Props) {
  return <GameBoard />;
}
