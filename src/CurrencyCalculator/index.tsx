import React from 'react';
import { useSelector } from 'react-redux/es/exports';
import { IRate } from '../store/currencySlice';
import { RootState } from '../store/store';
import { CURRENCIES_DICTIONARY_WITH_OF_PREFIX, ORDERED_LIST_OF_CURRENCIES, RUB_RATE } from '../utils/constants';
import { currencyFromRUB, currencyToRUB } from '../utils/interratesCalculators';
import { TvalidCurrency } from '../utils/types';
import style from './CurrencyCalculator.module.scss';

const checkInputForValidNumber = (
    input: string,
): { isValid: boolean; inputString: string } => {
    let formattedInput = input.replace(',', '.').trim();
    if (formattedInput.length > 1 && formattedInput[0] === '0') {
        formattedInput = formattedInput.slice(1);
    }
    if (formattedInput.length > 12) {
        return { isValid: false, inputString: '' };
    }
    if (input === 'Infinity' || input === '-Infinity') {
        return { isValid: false, inputString: '' };
    }
    const numberCandidate = Number(formattedInput);
    if (Object.is(numberCandidate, NaN) || numberCandidate > 10000000000) {
        return { isValid: false, inputString: '' };
    }
    return { isValid: true, inputString: formattedInput };
};

const getFormattedRatesListOne = (rates: IRate[]): IRate[] => {
    const result = [...rates];
    result.unshift(RUB_RATE);
    return result;
};

const getFormattedRatesListTwo = (rates: IRate[]): IRate[] => {
    const result = [...rates];
    result.push(RUB_RATE);
    return result;
};

const checkTypeOfCurrency = (curr: string): curr is TvalidCurrency => ORDERED_LIST_OF_CURRENCIES.includes(curr);

export default function CurrencyCalculator() {
    const rates = useSelector((state: RootState) => state.currency.rates);
    const isLoading = useSelector((state: RootState) => state.currency.isLoading);
    const requestError = useSelector((state: RootState) => state.currency.requestError);
    const [inputOne, setInputOne] = React.useState('0');
    const [inputTwo, setInputTwo] = React.useState('0');
    const [currencyOne, setCurrencyOne] = React.useState('');
    const [currencyTwo, setCurrencyTwo] = React.useState('');
    const [exchangeRateOne, setExchangeRateOne] = React.useState(1);
    const [exchangeRateTwo, setExchangeRateTwo] = React.useState(1);

    const formattedRatesListOne = getFormattedRatesListOne(rates);
    const formattedRatesListTwo = getFormattedRatesListTwo(rates);

    const listOfCurrenciesForSelectOne = formattedRatesListOne.map((element, index) => (
        <option key={element.currencyCode + index} value={element.currencyCode}>
            {CURRENCIES_DICTIONARY_WITH_OF_PREFIX[element.currencyCode]}
        </option>
    ));
    const listOfCurrenciesForSelectTwo = formattedRatesListTwo.map((element, index) => (
        <option key={element.currencyCode + index} value={element.currencyCode}>
            {CURRENCIES_DICTIONARY_WITH_OF_PREFIX[element.currencyCode]}
        </option>
    ));

    const handleInputOne = (e: React.BaseSyntheticEvent) => {
        const { isValid, inputString } = checkInputForValidNumber(
            e?.target?.value,
        );
        if (isValid) {
            setInputOne(inputString);
            const calculateToRUB = currencyToRUB(Number(inputString), exchangeRateOne);
            const calculateFromRUB = String(currencyFromRUB(calculateToRUB, exchangeRateTwo));
            setInputTwo(calculateFromRUB);
        }
    };

    const handleInputTwo = (e: React.BaseSyntheticEvent) => {
        const { isValid, inputString } = checkInputForValidNumber(
            e?.target?.value,
        );
        if (isValid) {
            setInputTwo(inputString);
            const calculateToRUB = currencyToRUB(
                Number(inputString),
                exchangeRateTwo,
            );
            const calculateFromRUB = String(
                currencyFromRUB(calculateToRUB, exchangeRateOne),
            );
            setInputOne(calculateFromRUB);
        }
    };

    const handleSelectFirstCurrenncy = (currencyCode: TvalidCurrency) => {
        const currencyRate = formattedRatesListOne.find((element) => element.currencyCode === currencyCode);
        if (!currencyRate || !currencyRate.currencyCode || !currencyRate.rateToRUB) {
            return;
        }
        setCurrencyOne(currencyCode);
        setExchangeRateOne(currencyRate.rateToRUB);
        const calculateToRUB = currencyToRUB(Number(inputTwo), exchangeRateTwo);
        const calculateFromRUB = String(currencyFromRUB(calculateToRUB, currencyRate.rateToRUB));
        setInputOne(calculateFromRUB);
        try {
            localStorage.setItem('currencyOne', currencyCode);
        } catch (error) {
            console.error('localStorage is not available ' + String(error));
        }
    };

    const handleSelectSecondCurrenncy = (currencyCode: TvalidCurrency) => {
        const currencyRate = formattedRatesListTwo.find((element) => element.currencyCode === currencyCode);
        if (!currencyRate || !currencyRate.currencyCode || !currencyRate.rateToRUB) {
            return;
        }
        setCurrencyTwo(currencyCode);
        setExchangeRateTwo(currencyRate.rateToRUB);
        const calculateToRUB = currencyToRUB(Number(inputOne), exchangeRateOne);
        const calculateFromRUB = String(currencyFromRUB(calculateToRUB, currencyRate.rateToRUB));
        setInputTwo(calculateFromRUB);
        try {
            localStorage.setItem('currencyTwo', currencyCode);
        } catch (error) {
            console.error('localStorage is not available ' + String(error));
        }
    };

    React.useLayoutEffect(() => {
        let currencyFromLsOne;
        let currencyFromLsTwo;
        try {
            currencyFromLsOne = localStorage.getItem('currencyOne');
            currencyFromLsTwo = localStorage.getItem('currencyTwo');
        } catch (error) {
            console.error('localStorage is not available ' + String(error));
        }
        if (checkTypeOfCurrency(currencyFromLsOne)) {
            handleSelectFirstCurrenncy(currencyFromLsOne);
        } else {
            setExchangeRateOne(formattedRatesListOne[0].rateToRUB);
        }
        if (checkTypeOfCurrency(currencyFromLsTwo)) {
            handleSelectSecondCurrenncy(currencyFromLsTwo);
        } else {
            setExchangeRateTwo(formattedRatesListTwo[0].rateToRUB);
        }
    }, [rates]);

    return (
        <div className={style.calculator}>
            <div className={isLoading ? style.spinner : style.spinnerDisabled}>
                <div>
                    <div className={style.ldsFacebook}>
                        <div />
                        <div />
                        <div />
                    </div>
                </div>
            </div>
            <h2 className={style.calculator__header}>Калькулятор курсов</h2>
            <form>
                <div className={style.calculator__row}>
                    <input
                        type="text"
                        className={style.calculator__input}
                        onChange={(e: React.BaseSyntheticEvent) => handleInputOne(e)}
                        value={inputOne}
                    />
                    <select
                        className={style.calculator__select}
                        value={currencyOne}
                        onChange={(e) => handleSelectFirstCurrenncy(e.target.value)}
                    >
                        {listOfCurrenciesForSelectOne}
                    </select>
                </div>
                <div className={style.calculator__row}>
                    <input
                        type="text"
                        className={style.calculator__input}
                        onChange={(e: React.BaseSyntheticEvent) => handleInputTwo(e)}
                        value={inputTwo}
                    />
                    <select
                        className={style.calculator__select}
                        value={currencyTwo}
                        onChange={(e) => handleSelectSecondCurrenncy(e.target.value)}
                    >
                        {listOfCurrenciesForSelectTwo}
                    </select>
                </div>
            </form>
            <div className={style.error}>
                {requestError ? 'Внимание! Данные калькулятора устарели. ' + requestError : ''}
            </div>
            <p className={style.calculator__note}>
                *Согласно постановлению Центробанка России №12345 от 01 января 2021 года, все кросс-курсы подсчитываются через конвертацию в рубли.
            </p>
        </div>
    );
}
