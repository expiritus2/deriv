import { action, makeObservable, observable } from 'mobx';
import { SortEnum, SortFieldEnum } from './enums/sort';
import { cloneDeep } from 'lodash';

const sortInitialState = { field: SortFieldEnum.NAME, order: SortEnum.ASC };

export class AppState {
    activeTab: string = '';
    subMarketActiveTab: string | undefined = undefined;
    sort: { field: SortFieldEnum; order: SortEnum } = cloneDeep(sortInitialState);

    constructor() {
        makeObservable(this, {
            activeTab: observable,
            sort: observable,
            subMarketActiveTab: observable,
            setActiveTab: action,
            setSort: action,
            setSubMarketActiveTab: action,
            resetSort: action,
        })
    }

    setActiveTab(tab: string) {
        if(this.activeTab !== tab) {
            this.activeTab = tab;
            this.resetSort()
        }
    }

    setSubMarketActiveTab(subMarketActiveTab: string | undefined) {
        this.subMarketActiveTab = subMarketActiveTab;
    }

    setSort(field: SortFieldEnum, order: SortEnum ) {
        this.sort = { field, order };
    }

    resetSort() {
        this.sort = cloneDeep(sortInitialState);
    }
}
