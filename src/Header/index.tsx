import React from 'react';
import { useSelector } from 'react-redux/es/exports';
import { fetchExchangeRate } from '../store/currencySlice';
import { RootState, useAppDispatch } from '../store/store';
import { MONTHS_RUS } from '../utils/constants';
import { TEndpoint, Tmonth } from '../utils/types';
import { throttle } from '../utils/utils';
import style from './Header.module.scss';
import hedgPic from '../assets/hedg.svg';

const getFormattedDate = (
    unformattedDate: string,
): { dateDay: string; dateMonth: Tmonth; dateTime: string; dateNow: boolean } => {
    let derivedDate = new Date(unformattedDate);
    let theNow = false;
    if (unformattedDate === '' || Number.isNaN(derivedDate.getTime()) || !(derivedDate instanceof Date)) {
        derivedDate = new Date();
        theNow = true;
    }
    const theDay = String(derivedDate.getDate()).padStart(2, '0');
    const theMonth = MONTHS_RUS[derivedDate.getMonth()];
    const theTime = `${String(derivedDate.getHours()).padStart(
        2,
        '0',
    )}:${String(derivedDate.getMinutes()).padStart(2, '0')}`;
    return { dateDay: theDay, dateMonth: theMonth, dateTime: theTime, dateNow: theNow };
};

export default function Header() {
    const dateOfLastUpdate = useSelector(
        (state: RootState) => state.currency.date,
    );
    const dispatch = useAppDispatch();
    const [source, setSource] = React.useState<TEndpoint>('cbr');

    const formattedDate = getFormattedDate(dateOfLastUpdate);

    const handleClickCheck = () => {
        dispatch(fetchExchangeRate(source));
    };

    const handleCbrRadio = () => {
        setSource('cbr');
        dispatch(fetchExchangeRate('cbr'));
    };

    const handleMoexRadio = () => {
        setSource('moex');
        dispatch(fetchExchangeRate('moex'));
    };

    React.useLayoutEffect(() => {
        dispatch(fetchExchangeRate(source));
    }, []);

    return (
        <div className={style.header}>
            <div className={style.header__firstContainer}>
                <img src={hedgPic} className={style.hedgePic} alt='funny hedgehog' />
                <div className={style.header__headersBlock}>
                    <h1 className={style.header__firstHeader}>Наш Ёж</h1>
                    <h2 className={style.header__secondHeader}>Пересчитает ваши деньги</h2>
                    <h3 className={style.header__thirdHeader}>в любую валюту</h3>
                </div>
            </div>
            <div className={style.header__secondContainer}>
                <div className={style.dateBox}>
                    <h3 className={style.dateBox__header}>{formattedDate.dateNow ? 'Сегодня:' : 'Курсы от:'}</h3>
                    <p className={style.dateBox__time}>{formattedDate.dateNow ? '__:__ ' : formattedDate.dateTime}</p>
                    <p className={style.dateBox__time}>{`${formattedDate.dateDay} ${formattedDate.dateMonth}`}</p>
                </div>
                <button className={style.refreshButton} onClick={throttle(handleClickCheck)}>Обновить</button>
                <form>
                    <label className={style.source} htmlFor='cbr'>
                        <p className={style.source__parag}>Центробанк России</p>
                        <input
                            id='cbr'
                            type="radio"
                            className={style.source__radio}
                            checked={source === 'cbr'}
                            onChange={handleCbrRadio}
                        />
                    </label>
                    <label className={style.source} htmlFor='moex'>
                        <p className={style.source__parag}>Московская биржа</p>
                        <input
                            id='moex'
                            type="radio"
                            className={style.source__radio}
                            checked={source === 'moex'}
                            onChange={handleMoexRadio}
                        />
                    </label>
                </form>
            </div>
        </div>
    );
}
