import { makeObservable, observable, action } from 'mobx';
import derivApi from '../services/derivApi';
import { History } from './types/history';

export class HistoryStore {
    data: History = { prices: [], times: [] };

    constructor() {
        makeObservable(this, {
            data: observable,
            getTicksHistory: action
        })
    }

    setData(history: History) {
        this.data = history;
    }

    async getTicksHistory() {
        await derivApi.ticksHistoryApi.getTicksHistory(this.setData.bind(this));
    }
}
