import { IRate } from '../store/currencySlice';
import { Tmonth } from './types';

export const RUB_RATE: IRate = { currencyCode: 'RUB', rateToRUB: 1 };

export const ORDERED_LIST_OF_CURRENCIES = [
    'RUB',
    'USD',
    'EUR',
    'CNY',
    'AUD',
    'AZN',
    'GBP',
    'AMD',
    'BYN',
    'BGN',
    'BRL',
    'HUF',
    'HKD',
    'DKK',
    'INR',
    'KZT',
    'CAD',
    'KGS',
    'MDL',
    'NOK',
    'PLN',
    'RON',
    'XDR',
    'SGD',
    'TJS',
    'TRY',
    'TMT',
    'UZS',
    'UAH',
    'CZK',
    'SEK',
    'CHF',
    'ZAR',
    'KRW',
    'JPY',
];

export const CURRENCIES_DICTIONARY_WITH_OF_PREFIX = {
    AUD: 'Австралийский доллар',
    AZN: 'Азербайджанский манат',
    GBP: 'Фунт стерлингов Соединенного королевства',
    AMD: 'Армянских драмов',
    BYN: 'Белорусский рубль',
    BGN: 'Болгарский лев',
    BRL: 'Бразильский реал',
    HUF: 'Венгерских форинтов',
    HKD: 'Гонконгских долларов',
    DKK: 'Датская крона',
    USD: 'Доллар США',
    EUR: 'Евро',
    INR: 'Индийских рупий',
    KZT: 'Казахстанских тенге',
    CAD: 'Канадский доллар',
    KGS: 'Киргизских сомов',
    CNY: 'Китайский юань',
    MDL: 'Молдавских леев',
    NOK: 'Норвежских крон',
    PLN: 'Польский злотый',
    RON: 'Румынский лей',
    RUB: 'Российских рублей',
    XDR: 'СДР (специальные права заимствования)',
    SGD: 'Сингапурский доллар',
    TJS: 'Таджикских сомони',
    TRY: 'Турецких лир',
    TMT: 'Новый туркменский манат',
    UZS: 'Узбекских сумов',
    UAH: 'Украинских гривен',
    CZK: 'Чешских крон',
    SEK: 'Шведских крон',
    CHF: 'Швейцарский франк',
    ZAR: 'Южноафриканских рэндов',
    KRW: 'Вон Республики Корея',
    JPY: 'Японских иен',
};

export const MONTHS_RUS = [
    'янв.',
    'фев.',
    'марта',
    'апр.',
    'мая',
    'июн.',
    'июл.',
    'авг.',
    'сент.',
    'окт.',
    'нояб.',
    'дек.',
];
