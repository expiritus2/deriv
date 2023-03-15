export type ActiveSymbol = {
    allow_forward_starting: number;
    delay_amount: number;
    display_name: string;
    display_order: number;
    exchange_is_open: number;
    exchange_name: string;
    intraday_interval_minutes: number;
    is_trading_suspended: number;
    market: string;
    market_display_name: string;
    pip: number;
    quoted_currency_symbol: string;
    spot: number;
    spot_age: string;
    spot_percentage_change: number;
    spot_time: number;
    subgroup: string;
    subgroup_display_name: string;
    submarket: string;
    submarket_display_name: string;
    symbol: string;
    symbol_type: string;
}
