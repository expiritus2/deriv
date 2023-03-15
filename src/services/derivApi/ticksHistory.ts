// @ts-ignore
import DerivAPIBasic from 'https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic';
import { History } from 'store/types/history';

class TicksHistoryApi {
    connection: WebSocket;
    api: DerivAPIBasic;
    ticksHistoryRequest = {
        ticks_history: 'R_100',
        adjust_start_time: 1,
        count: 10,
        end: "latest",
        start: 1,
        style: "ticks",
    }

    constructor(connection: WebSocket, api: DerivAPIBasic) {
        this.connection = connection;
        this.api = api;
    }

    async ticksHistoryResponse(res: any, handler: ({ prices, times }: History) => void) {
        const data = JSON.parse(res.data);
        if (data.error !== undefined) {
            console.log("Error : ", data.error.message);
            this.connection.removeEventListener("message", (res: any) => this.ticksHistoryResponse.call(this, res, handler), false);
            await this.api.disconnect();
        }
        if (data.msg_type === "history") {
            handler(data.history);
        }
        this.connection.removeEventListener("message", (res: any) => this.ticksHistoryResponse.call(this, res, handler), false);
    };

    async getTicksHistory(handler: ({ prices, times }: History) => void) {
        this.connection.addEventListener("message", (res: any) => this.ticksHistoryResponse.call(this, res, handler));
        await this.api.ticksHistory(this.ticksHistoryRequest);
    };
}

export default TicksHistoryApi;
