import * as React from 'react';
import { css } from 'emotion';
import { createStyles } from './shared/utils';

interface IHomeProps {}

type Props = Readonly<IHomeProps>;

export function Home(props: Props) {
  return <div>Welcome</div>;
}

const styles = createStyles({});
