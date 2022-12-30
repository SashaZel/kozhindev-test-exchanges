import React from 'react';
import { useSelector } from 'react-redux/es/exports';
import { RootState } from '../store/store';
import { CURRENCIES_DICTIONARY_WITH_OF_PREFIX } from '../utils/constants';
import { currencyFirstToSecond, getMainCurRates } from '../utils/interratesCalculators';
import style from './CurrencyTable.module.scss';

export default function CurrencyTable() {
    const currencyDataList = useSelector(
        (state: RootState) => state.currency.rates,
    );

    const { usdToRub, eurToRub, cnyToRub} = getMainCurRates(currencyDataList);

    const currencyTable = currencyDataList.map((item, index) => (
        <div
            key={index + item.currencyCode + item.rateToRUB}
            className={style.currencyTable__row}
        >
            <div>{String(index + 1)}</div>
            <div>{item.currencyCode}</div>
            <div>
                {CURRENCIES_DICTIONARY_WITH_OF_PREFIX[item.currencyCode]
                || 'Ошибка: Неизвестная валюта'}
            </div>
            <div>{item.rateToRUB}</div>
            <div>{currencyFirstToSecond(item.rateToRUB, usdToRub) || 'Нет данных'}</div>
            <div>{currencyFirstToSecond(item.rateToRUB, eurToRub) || 'Нет данных'}</div>
            <div>{currencyFirstToSecond(item.rateToRUB, cnyToRub) || 'Нет данных'}</div>
        </div>
    ));

    return (
        <div className={style.container}>
            <h2>CurrencyTable</h2>
            {currencyTable}
        </div>
    );
}
