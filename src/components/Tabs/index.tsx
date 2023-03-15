import React, { FC } from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store';
import CategoryTab from './CategoryTab';
import SubMarketTab from './SubmarketTab';
import { Content } from 'components';

import styles from './style.module.scss';

type ComponentProps = {
    className?: string;
}

const Tabs: FC<ComponentProps> = (props) => {
    const { className } = props;
    const { appState, activeSymbols } = useStore();
    const subMarketNames = activeSymbols.getSubMarketNames(appState.activeTab);

    const onClickTab = (tab: string) => {
        appState.setActiveTab(tab);
        appState.setSubMarketActiveTab(undefined);
    }

    const onClickSubMarketTab = (subMarketTab: string) => {
        if (appState.subMarketActiveTab === subMarketTab) {
            appState.setSubMarketActiveTab(undefined);
        } else {
            appState.setSubMarketActiveTab(subMarketTab);
        }
    }

    return (
        <div className={classNames(styles.tabsWrapper, className)}>
            <div className={styles.tabs}>
                {activeSymbols.names.map((tab) => (
                    <CategoryTab
                        key={tab}
                        label={tab}
                        onClick={() => onClickTab(tab)}
                        active={appState.activeTab === tab}
                    />
                ))}
            </div>
            <div className={styles.subMarketTabs}>
                {subMarketNames.map((subMarketTab) => (
                    <SubMarketTab
                        key={subMarketTab}
                        label={subMarketTab}
                        onClick={() => onClickSubMarketTab(subMarketTab)}
                        active={appState.subMarketActiveTab === subMarketTab}
                    />
                ))}
            </div>
            <Content />
        </div>
    );
};

export default observer(Tabs);
