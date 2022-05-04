import { Subtitle2 } from '@basics';
import CircularProgress from '@material-ui/core/CircularProgress';
import cn from 'classnames';
import React, { FunctionComponent } from 'react';
import styles from './Loading.module.scss';

interface LoadingProps {
  text: string;
}

const PROGRESS_THICKNESS = 4;
const PROGRESS_SIZE = 40;

const Loading: FunctionComponent<LoadingProps> = ({ text }) => (
  <div
    className={cn(
      styles.loadingWrapper,
      'w-100 d-flex flex-column justify-content-center align-items-center',
    )}
  >
    <div className={styles.loadingBackground} />
    <div className={styles.root}>
      <CircularProgress
        variant="determinate"
        className={styles.bottom}
        size={PROGRESS_SIZE}
        thickness={PROGRESS_THICKNESS}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={styles.top}
        size={PROGRESS_SIZE}
        thickness={PROGRESS_THICKNESS}
      />
    </div>
    <Subtitle2>{text}</Subtitle2>
  </div>
);

export default Loading;
