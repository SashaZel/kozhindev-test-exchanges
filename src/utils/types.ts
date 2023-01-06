import { MONTHS_RUS, ORDERED_LIST_OF_CURRENCIES } from './constants';

export type TvalidCurrency = (typeof ORDERED_LIST_OF_CURRENCIES)[number];
export type Tmonth = (typeof MONTHS_RUS)[number];

export type TEndpoint = 'cbr' | 'moex';

export type TSorting = 'default' | 'byCode' | 'byName' | 'byUSDrate' | 'byRUBrate' | 'byEuroRate' | 'byCNYrate';
