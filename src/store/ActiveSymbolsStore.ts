import { action, makeObservable, observable } from 'mobx';
import { ActiveSymbol } from './types/activeSymbols';
import derivApi from '../services/derivApi';
import { groupBy } from 'lodash';

import store from './index';
import { SortEnum, SortFieldEnum } from './enums/sort';

export class ActiveSymbolsStore {
    loading: boolean = false;
    list: ActiveSymbol[] = [];
    names: string[] = [];

    constructor() {
        makeObservable(this, {
            list: observable,
            loading: observable,
            names: observable,
            setNames: observable,

            getActiveSymbols: action,
            setLoading: action,
            setSymbols: action,
        })
    }

    setNames(symbols: ActiveSymbol[]) {
        const grouped = groupBy(symbols, 'market_display_name');
        this.names = Object.keys(grouped).sort((a, b) => a.localeCompare(b));
        if(!store.appState.activeTab) {
            store.appState.activeTab = this.names[0];
        }
    }

    setLoading(loading: boolean) {
        this.loading = loading;
    }

    setSymbols(symbols: ActiveSymbol[]) {
        this.list = symbols.sort((s1, s2) => s1.display_order - s2.display_order);
        this.setNames(this.list);
        this.setLoading(false);
    }

    getTabSymbols(tab: string, subMarketTab?: string | undefined) {
        return this.list
            .filter((item) => subMarketTab ? item.market_display_name === tab && subMarketTab === item.submarket_display_name : item.market_display_name === tab)
            .sort((a: ActiveSymbol, b: ActiveSymbol) => {
                if (store.appState.sort.field === SortFieldEnum.NAME) {
                    if(store.appState.sort.order === SortEnum.ASC) {
                        return a[SortFieldEnum.NAME].localeCompare(b[SortFieldEnum.NAME])
                    } else {
                        return b[SortFieldEnum.NAME].localeCompare(a[SortFieldEnum.NAME])
                    }

                }
                return 1;
            });
    }

    getSubMarketNames(tab: string) {
        const grouped = groupBy(this.getTabSymbols(tab), 'submarket_display_name');
        const names = Object.keys(grouped)
        return names.length > 1 ? names.sort((a, b) => a.localeCompare(b)) : [];
    }

    async getActiveSymbols() {
        this.setLoading(true);
        await derivApi.symbolsApi.getActiveSymbols(this.setSymbols.bind(this));
    }
}
