import React, { FC } from 'react';
import classNames from 'classnames';

import styles from './style.module.scss';

type ComponentProps = {
    className?: string;
    label: string | React.ReactNode;
    onClick: React.MouseEventHandler<HTMLDivElement>
}

const Sort: FC<ComponentProps> = (props) => {
    const { className, label, onClick } = props;

    return (
        <div onClick={onClick} className={classNames(styles.sort, className)}>
            <span>{label}</span>
            <span className={styles.arrows} />
        </div>
    );
};

export default Sort;
