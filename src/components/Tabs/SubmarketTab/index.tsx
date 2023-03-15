import React, { FC } from 'react';
import classNames from 'classnames';

import styles from './style.module.scss';

type ComponentProps = {
    className?: string;
    onClick: React.MouseEventHandler<HTMLDivElement>;
    active: boolean;
    label: string | React.ReactNode;
}

const SubMarketTab: FC<ComponentProps> = (props) => {
    const { className, onClick, active, label } = props;

    return (
        <div onClick={onClick} className={classNames(styles.subMarketTab, { [styles.active]: active}, className)}>
            {label}
        </div>
    );
};

export default SubMarketTab;
