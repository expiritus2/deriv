import React, { FC } from 'react';
import classNames from 'classnames';
import { Chart, Button } from 'components';

import { ActiveSymbol } from 'store/types/activeSymbols';

import styles from './style.module.scss';

type ComponentProps = {
    className?: string;
    data: ActiveSymbol
}

const Symbol: FC<ComponentProps> = (props) => {
    const { data, className } = props;

    return (
        <div className={classNames(styles.symbol, className)}>
            <div className={styles.element}>{data.display_name}</div>
            <div className={styles.element}>{data.spot}</div>
            <div className={styles.element}>Test 3</div>
            <Chart className={styles.element} data={{ labels: [], datasets: [] }} />
            <Button className={styles.element}>Trade</Button>
        </div>
    );
};

export default Symbol;
