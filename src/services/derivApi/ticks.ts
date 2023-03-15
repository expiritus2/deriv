// @ts-ignore
import DerivAPIBasic from 'https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic';
import { Tick } from 'store/types/ticks';

class TicksApi {
    connection: WebSocket;
    api: DerivAPIBasic

    constructor(connection: WebSocket, api: DerivAPIBasic) {
        this.connection = connection;
        this.api = api;
    }

    tickStream() {
        return this.api.subscribe({ ticks: "R_100" });
    }

    async tickResponse(res: any, handler: (tick: Tick) => void) {
        const data = JSON.parse(res.data);
        if (data.error !== undefined) {
            console.log("Error : ", data.error.message);
            this.connection.removeEventListener("message", (res: any) => this.tickResponse.call(this, res, handler), false);
            await this.api.disconnect();
        }
        if (data.msg_type === "tick") {
            handler(data.tick);
        }
    };

    async subscribeTicks(handler: (tick: Tick) => void) {
        await this.tickStream();
        this.connection.addEventListener("message", (res: any) => this.tickResponse.call(this, res, handler));
    };

    unsubscribeTicks(handler: (res: any) => void) {
        this.connection.removeEventListener("message", (res: any) => this.tickResponse.call(this, res, handler), false);
        this.tickStream().unsubscribe();
    };
}

export default TicksApi;
