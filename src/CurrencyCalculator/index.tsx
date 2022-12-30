import React from 'react';
import { useSelector } from 'react-redux/es/exports';
import { currencyActions } from '../store/currencySlice';
import { RootState, useAppDispatch } from '../store/store';
import { currencyFromRUB, currencyToRUB } from '../utils/interratesCalculators';
import style from './CurrencyCalculator.module.scss';

const checkInputForValidNumber = (input: string): { isValid: boolean, inputString: string } => {
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

export default function CurrencyCalculator() {
    const count = useSelector((state: RootState) => state.currency.source);
    const dispatch = useAppDispatch();
    const [inputOne, setInputOne] = React.useState('0');
    const [inputTwo, setInputTwo] = React.useState('0');
    const [exchangeRateOne, setExchangeRateOne] = React.useState(70);
    const [exchangeRateTwo, setExchangeRateTwo] = React.useState(50);

    const handleInputOne = (e: React.BaseSyntheticEvent) => {
        //console.log('input One ' + e.target.value);
        const { isValid, inputString} = checkInputForValidNumber(e?.target?.value);
        if (isValid) {
            setInputOne(inputString);
            const calculateToRUB = currencyToRUB(Number(inputString), exchangeRateOne);
            const calculateFromRUB = String(currencyFromRUB(calculateToRUB, exchangeRateTwo));
            setInputTwo(calculateFromRUB);
        }
    };

    const handleInputTwo = (e: React.BaseSyntheticEvent) => {
        const { isValid, inputString} = checkInputForValidNumber(e?.target?.value);
        if (isValid) {
            setInputTwo(inputString);
            const calculateToRUB = currencyToRUB(Number(inputString), exchangeRateTwo);
            const calculateFromRUB = String(currencyFromRUB(calculateToRUB, exchangeRateOne));
            setInputOne(calculateFromRUB);
        }
    };

    return (
        <div className={style.container}>
            CurrencyCalculator. Count
            {count}
            <div className={style.curCal__form}>
                The Form
                <form>
                    <input
                        type="text"
                        onChange={(e: React.BaseSyntheticEvent) => handleInputOne(e)}
                        value={inputOne}
                    />
                    <input
                        type="text"
                        onChange={(e: React.BaseSyntheticEvent) => handleInputTwo(e)}
                        value={inputTwo}
                    />
                </form>
            </div>
        </div>
    );
}
