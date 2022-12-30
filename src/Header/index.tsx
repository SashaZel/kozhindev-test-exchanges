import React from 'react';
import { useSelector } from 'react-redux/es/exports';
import { fetchExchangeRate } from '../store/currencySlice';
import { RootState, useAppDispatch } from '../store/store';
import style from './Header.module.scss';

export default function Header() {
    const dateOfLastUpdate = useSelector((state: RootState) => state.currency.date);
    const dispatch = useAppDispatch();

    const handleClickCheck = () => {
        //hitCbrAPI();
        dispatch(fetchExchangeRate('cbr'));
    };

    return (
        <div className={style.container}>
            Header
            {dateOfLastUpdate}
            <button onClick={handleClickCheck}>Check the rates</button>
        </div>
    );
}
