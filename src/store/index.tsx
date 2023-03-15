import { createContext, useContext } from 'react';
import { ActiveSymbolsStore } from './ActiveSymbolsStore';
import { HistoryStore } from './HistoryStore';
import { TickStore } from './TickStore';
import { AppState } from './AppState';

const store = {
    activeSymbols: new ActiveSymbolsStore(),
    history: new HistoryStore(),
    tick: new TickStore(),
    appState: new AppState()
};

export const StoreContext = createContext(store);

export const useStore = () => useContext<typeof store>(StoreContext);

export default store;
