import React from 'react';
import { useSelector } from 'react-redux/es/exports';
import { IRate } from '../store/currencySlice';
import { RootState } from '../store/store';
import { CURRENCIES_DICTIONARY_WITH_OF_PREFIX } from '../utils/constants';
import TableRow from '../TableRow';
import style from './CurrencyTable.module.scss';
import SortingPanel from '../SortingPanel';

const searchInCurrencies = (querry: string, arrayForSearch: IRate[]): IRate[] => {
    const formattedQuerry = querry.trim().toLowerCase();
    const result = [...arrayForSearch];
    if (!formattedQuerry) {
        return result;
    }
    return result.filter((element) => element.currencyCode.toLowerCase().includes(formattedQuerry)
    || CURRENCIES_DICTIONARY_WITH_OF_PREFIX[element.currencyCode].toLowerCase().includes(formattedQuerry));
};

export default function CurrencyTable() {
    const currencyDataList = useSelector(
        (state: RootState) => state.currency.rates,
    );
    const isLoading = useSelector((state: RootState) => state.currency.isLoading);
    const [showAll, setShowAll] = React.useState(false);
    const [searchQuerry, setSearchQuerry] = React.useState('');

    const filteredCurrencyDataList = searchInCurrencies(searchQuerry, currencyDataList);

    let formattedCurrencyDataList;
    if (!showAll) {
        formattedCurrencyDataList = filteredCurrencyDataList.slice(0, 5);
    } else {
        formattedCurrencyDataList = filteredCurrencyDataList;
    }

    //console.time('currencyTable');
    const currencyTable = formattedCurrencyDataList.map((item, index) => (
        <TableRow
            item={item}
            index={index}
            key={index + item.currencyCode + item.rateToRUB}
        />
    ));
    //console.timeEnd('currencyTable');

    const searchFailed = (
        <div className={style.searchFailed}>Ничего не найдено.</div>
    );

    return (
        <div className={style.table}>
            <div className={style.table__container}>
                <div className={isLoading ? style.spinner : style.spinnerDisabled}>
                    <div>
                        <div className={style.ldsFacebook}>
                            <div />
                            <div />
                            <div />
                        </div>
                    </div>
                </div>
                <h2>Курсы валют</h2>
                <div className={style.table__searchAndSortingContainer}>
                    <div className={style.search}>
                        <p className={style.search__title}>Поиск по валютам:</p>
                        <form className={style.search__form}>
                            <input
                                className={style.search__input}
                                type="text"
                                value={searchQuerry}
                                onChange={(e) => setSearchQuerry(e.target.value)}
                            />
                        </form>
                    </div>
                    <SortingPanel />
                </div>
                <div className={style.table__columnHeaders}>
                    <div className={style.table__leftHeaders}>
                        <p className={style.table__leftHeader}>#</p>
                        <p className={style.table__leftHeader}>Код</p>
                        <p className={style.table__leftHeader}>Название</p>
                    </div>
                    <div className={style.table__rightHeaders}>
                        <div className={style.table__rightHeader}>рублей</div>
                        <div className={style.table__rightHeader}>долларов</div>
                        <div className={style.table__rightHeader}>евро</div>
                        <div className={style.table__rightHeader}>юаней</div>
                    </div>
                </div>
                <div className={style.table__panel}>
                    {currencyTable.length === 0 ? searchFailed : currencyTable}
                </div>
                <button className={style.moreButton} onClick={() => setShowAll(!showAll)}>{showAll ? 'Скрыть' : 'Показать все'}</button>
            </div>
        </div>
    );
}
