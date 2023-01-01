import React from 'react';
import { useSelector } from 'react-redux/es/exports';
import { fetchExchangeRate } from '../store/currencySlice';
import { RootState, useAppDispatch } from '../store/store';
import { MONTHS_RUS } from '../utils/constants';
import { Tmonth } from '../utils/types';
import style from './Header.module.scss';

const getFormattedDate = (unformattedDate): { dateDay: string, dateMonth: Tmonth, dateTime: string } => {
    const derivedDate = new Date(unformattedDate);
    if (Number.isNaN(derivedDate.getTime()) || !(derivedDate instanceof Date)) {
        console.error('Wrong date format');
        return { dateDay: '00', dateMonth: 'янв.', dateTime: '00:00'};
    }
    const theDay = String(derivedDate.getDate()).padStart(2, '0');
    const theMonth = MONTHS_RUS[derivedDate.getMonth()];
    const theTime = `${String(derivedDate.getHours()).padStart(2, '0')}:${String(derivedDate.getMinutes()).padStart(2, '0')}`;
    return ({ dateDay: theDay, dateMonth: theMonth, dateTime: theTime });
};

export default function Header() {
    const dateOfLastUpdate = useSelector((state: RootState) => state.currency.date);
    const dispatch = useAppDispatch();

    const formattedDate = getFormattedDate(dateOfLastUpdate);

    const handleClickCheck = () => {
        dispatch(fetchExchangeRate('cbr'));
    };

    return (
        <div className={style.container}>
            Header
            {dateOfLastUpdate}
            <div>
                <h3>Обменные курсы от:</h3>
                <p>{formattedDate.dateTime}</p>
                <p>{`${formattedDate.dateDay} ${formattedDate.dateMonth}`}</p>
            </div>
            <button onClick={handleClickCheck}>Check the rates</button>
        </div>
    );
}
