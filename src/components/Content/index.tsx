import React, { FC } from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';

import { ActiveSymbol } from 'store/types/activeSymbols';
import { Sort, Symbol } from 'components';
import { useStore } from 'store';

import styles from './style.module.scss';
import { SortEnum, SortFieldEnum } from '../../store/enums/sort';

type ComponentProps = {
    className?: string;
}

const Content: FC<ComponentProps> = (props) => {
    const { className } = props;
    const { appState, activeSymbols } = useStore();

    const onClickNameSort = () => {
        appState.setSort(SortFieldEnum.NAME, appState.sort.order === SortEnum.ASC ? SortEnum.DESC : SortEnum.ASC);
    }

    const onClickPriceSort = () => {

    }

    const onClickChangesSort = () => {

    }

    return (
        <div className={classNames(styles.content, className)}>
            <div className={styles.orders}>
                <Sort label="Name" onClick={onClickNameSort} />
                <Sort label="Last price" onClick={onClickPriceSort} />
                <Sort label="24h change" onClick={onClickChangesSort} />
                <div></div>
                <div></div>
            </div>
            {activeSymbols.getTabSymbols(appState.activeTab, appState.subMarketActiveTab).map((activeSymbol: ActiveSymbol) => {
                return <Symbol data={activeSymbol} key={activeSymbol.symbol} />
            })}
        </div>
    );
};

export default observer(Content);
