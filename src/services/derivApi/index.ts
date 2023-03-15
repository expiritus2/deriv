// @ts-ignore
import DerivAPIBasic from "https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic";
import TicksApi from './ticks';
import TicksHistoryApi from './ticksHistory';
import SymbolsApi from './symbols';

export type DerivApiParams = {
    appId?: number;
    ticks?: string;
};

class DerivApi {
    appId = 1089; // Replace with your app_id or leave as 1089 for testing.
    connection: WebSocket;
    api: DerivAPIBasic;

    symbolsApi: SymbolsApi;
    ticksApi: TicksApi;
    ticksHistoryApi: TicksHistoryApi;

    constructor({ appId, ticks }: DerivApiParams) {
        this.appId = appId || this.appId;
        this.connection = new WebSocket(
            `wss://ws.binaryws.com/websockets/v3?app_id=${this.appId}`
        );
        this.api = new DerivAPIBasic({ connection: this.connection });

        this.symbolsApi = new SymbolsApi(this.connection, this.api);
        this.ticksApi = new TicksApi(this.connection, this.api);
        this.ticksHistoryApi = new TicksHistoryApi(this.connection, this.api);
    }
}

const derivApi = new DerivApi({});
export default derivApi;
