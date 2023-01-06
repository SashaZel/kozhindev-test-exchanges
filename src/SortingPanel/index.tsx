import React from 'react';
import { useSelector } from 'react-redux/es/exports';
import { currencyActions } from '../store/currencySlice';
import { RootState, useAppDispatch } from '../store/store';
import { CURRENCIES_DICTIONARY_WITH_OF_PREFIX } from '../utils/constants';
import { currencyFirstToSecond, getMainCurRates } from '../utils/interratesCalculators';
import { TSorting } from '../utils/types';
import style from './SortingPanel.module.scss';

const sortStringFn = (a: string, b: string) => {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
};

export default function SortingPanel() {
    const [sortBy, setSortBy] = React.useState<TSorting>('default');
    const currencyDataList = useSelector(
        (state: RootState) => state.currency.rates,
    );
    const dispatch = useAppDispatch();

    const handleSort = (sort: TSorting) => {
        const ratesCopy = [...currencyDataList];
        if (sort === 'byCode') {
            ratesCopy.sort((a, b) => sortStringFn(a.currencyCode, b.currencyCode));
            dispatch(currencyActions.setSortedRates(ratesCopy));
        }
        if (sort === 'byName') {
            for (let i = 0; i < ratesCopy.length; i += 1) {
                ratesCopy[i] = {...ratesCopy[i], searchString: CURRENCIES_DICTIONARY_WITH_OF_PREFIX[ratesCopy[i].currencyCode] };
            }
            ratesCopy.sort((a, b) => sortStringFn(a.searchString, b.searchString));
            dispatch(currencyActions.setSortedRates(ratesCopy));
        }
        if (sort === 'byRUBrate') {
            ratesCopy.sort((a, b) => a.rateToRUB - b.rateToRUB);
            dispatch(currencyActions.setSortedRates(ratesCopy));
        }
        if (sort === 'byUSDrate') {
            const { usdToRub } = getMainCurRates(ratesCopy);
            for (let i = 0; i < ratesCopy.length; i += 1) {
                ratesCopy[i] = {...ratesCopy[i], searchNumber: currencyFirstToSecond(ratesCopy[i].rateToRUB, usdToRub)};
            }
            ratesCopy.sort((a, b) => a.searchNumber - b.searchNumber);
            dispatch(currencyActions.setSortedRates(ratesCopy));
        }
        if (sort === 'byEuroRate') {
            const { eurToRub } = getMainCurRates(ratesCopy);
            for (let i = 0; i < ratesCopy.length; i += 1) {
                ratesCopy[i] = {...ratesCopy[i], searchNumber: currencyFirstToSecond(ratesCopy[i].rateToRUB, eurToRub)};
            }
            ratesCopy.sort((a, b) => a.searchNumber - b.searchNumber);
            dispatch(currencyActions.setSortedRates(ratesCopy));
        }
        if (sort === 'byCNYrate') {
            const { cnyToRub } = getMainCurRates(ratesCopy);
            for (let i = 0; i < ratesCopy.length; i += 1) {
                ratesCopy[i] = {...ratesCopy[i], searchNumber: currencyFirstToSecond(ratesCopy[i].rateToRUB, cnyToRub)};
            }
            ratesCopy.sort((a, b) => a.searchNumber - b.searchNumber);
            dispatch(currencyActions.setSortedRates(ratesCopy));
        }
        setSortBy(sort);
    };

    return (
        <div>
            <h4 className={style.sorting__title}>Сортировка по:</h4>
            <button
                className={style.sorting__button + ' ' + (sortBy === 'byCode' ? style.sorting__button_active : '')}
                onClick={() => handleSort('byCode')}
            >
                коду
            </button>
            <button
                className={style.sorting__button + ' ' + (sortBy === 'byName' ? style.sorting__button_active : '')}
                onClick={() => handleSort('byName')}
            >
                названию
            </button>
            <button
                className={style.sorting__button + ' ' + (sortBy === 'byRUBrate' ? style.sorting__button_active : '')}
                onClick={() => handleSort('byRUBrate')}
            >
                курсу рубля
            </button>
            <button
                className={style.sorting__button + ' ' + (sortBy === 'byUSDrate' ? style.sorting__button_active : '')}
                onClick={() => handleSort('byUSDrate')}
            >
                курсу доллара
            </button>
            <button
                className={style.sorting__button + ' ' + (sortBy === 'byEuroRate' ? style.sorting__button_active : '')}
                onClick={() => handleSort('byEuroRate')}
            >
                курсу Евро
            </button>
            <button
                className={style.sorting__button + ' ' + (sortBy === 'byCNYrate' ? style.sorting__button_active : '')}
                onClick={() => handleSort('byCNYrate')}
            >
                курсу Юаня
            </button>
        </div>
    );
}
