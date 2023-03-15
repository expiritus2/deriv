// @ts-ignore
import DerivAPIBasic from 'https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic';
import { ActiveSymbol } from 'store/types/activeSymbols';

class SymbolsApi {
    connection: WebSocket;
    api: DerivAPIBasic
    activeSymbolsRequest = {
        active_symbols: "full",
        product_type: "basic"
    };

    constructor(connection: WebSocket, api: DerivAPIBasic) {
        this.connection = connection;
        this.api = api;
    }

    async activeSymbolsResponse(res: any, handler: (symbols: ActiveSymbol[]) => void) {
        const data = JSON.parse(res.data);

        if (data.error !== undefined) {
            console.log("Error : ", data.error?.message);
            this.connection.removeEventListener("message", (res: any) => this.activeSymbolsResponse.call(this, res, handler), false);
            await this.api.disconnect();
        }

        if (data.msg_type === "active_symbols") {
            handler(data.active_symbols);
        }

        this.connection.removeEventListener("message", (res: any) => this.activeSymbolsResponse.call(this, res, handler), false);
    };

    async getActiveSymbols(handler: (symbols: ActiveSymbol[]) => void) {
        this.connection.addEventListener("message", (res: any) => this.activeSymbolsResponse.call(this, res, handler));
        await this.api.activeSymbols(this.activeSymbolsRequest);
    };
}

export default SymbolsApi;
