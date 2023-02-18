import { memo } from 'react';
import cn from 'classnames';
import styles from './Text.module.scss';

interface TextProps {
  className?: string;
}

export const Text = memo(({ className }:TextProps) => {
  return (
      <div className={cn(styles.root, className)}>
          Text
      </div>
  );
});
