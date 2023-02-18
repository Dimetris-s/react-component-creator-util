import { memo } from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';

interface ButtonProps {
  className?: string;
}

export const Button = ({ className }:ButtonProps) => {
	return (
	  
        <div className={cn(styles.root, className)}>
            Button
        </div>

	);
};
