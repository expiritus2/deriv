import React, { FC } from 'react';
import classNames from 'classnames';

import styles from './style.module.scss';

type ComponentProps = {
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children: React.ReactNode;
}

const Button: FC<ComponentProps> = (props) => {
    const { className, onClick, children } = props;

    return (
        <div className={classNames(styles.buttonWrapper, className)}>
            <button onClick={onClick} className={styles.button}>
                {children}
            </button>
        </div>

    );
};

export default Button;
