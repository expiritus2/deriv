import { makeObservable, observable, action } from 'mobx';
import derivApi from '../services/derivApi';
import { Tick } from './types/ticks';

export class TickStore {
    data: Tick | null = null;

    constructor() {
        makeObservable(this, {
            data: observable,
            subscribeTicks: action,
            setData: action
        })
    }

    setData(tick: Tick) {
        this.data = tick;
    }

    handler(data: Tick) {
        this.setData(data)
    }

    async subscribeTicks() {
        await derivApi.ticksApi.subscribeTicks(this.handler.bind(this));
    }

    async unsubscribeTicks() {
        await derivApi.ticksApi.unsubscribeTicks(this.handler.bind(this));
    }
}
