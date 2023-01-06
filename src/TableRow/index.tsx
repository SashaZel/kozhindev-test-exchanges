import React from 'react';
import { useSelector } from 'react-redux/es/exports';
import { IRate } from '../store/currencySlice';
import { RootState } from '../store/store';
import { CURRENCIES_DICTIONARY } from '../utils/constants';
import { currencyFirstToSecond, getMainCurRates } from '../utils/interratesCalculators';
import style from './TableRow.module.scss';

export default function TableRow({ item, index}: { item: IRate, index: number}) {
    const currencyDataList = useSelector(
        (state: RootState) => state.currency.rates,
    );
    const { usdToRub, eurToRub, cnyToRub} = getMainCurRates(currencyDataList);

    return (
        <div
            className={style.row}
        >
            <div className={style.row__left}>
                <div className={style.row__number}>{'# ' + String(index + 1)}</div>
                <div className={style.row__code}>{item.currencyCode}</div>
                <div className={style.row__name}>
                    {CURRENCIES_DICTIONARY[item.currencyCode]
                    || 'Ошибка: Неизвестная валюта'}
                </div>
            </div>
            <div className={style.row__right}>
                <div className={style.row__rates}>
                    <span className={style.row__substForColumnName}>Курс к рублю</span>
                    <span className={style.row__rateValue}>{item.rateToRUB}</span>
                </div>
                <div className={style.row__rates}>
                    <span className={style.row__substForColumnName}>Курс к доллару США</span>
                    <span className={style.row__rateValue}>{currencyFirstToSecond(item.rateToRUB, usdToRub) || 'Нет данных'}</span>
                </div>
                <div className={style.row__rates}>
                    <span className={style.row__substForColumnName}>Курс к Евро</span>
                    <span className={style.row__rateValue}>{currencyFirstToSecond(item.rateToRUB, eurToRub) || 'Нет данных'}</span>
                </div>
                <div className={style.row__rates}>
                    <span className={style.row__substForColumnName}>Курс к китайскому Юаню</span>
                    <span className={style.row__rateValue}>{currencyFirstToSecond(item.rateToRUB, cnyToRub) || 'Нет данных'}</span>
                </div>
            </div>
        </div>
    );
}
