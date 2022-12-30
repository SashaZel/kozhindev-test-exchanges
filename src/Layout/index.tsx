import React from 'react';
import { useSelector } from 'react-redux/es/exports';
import { RootState } from '../store/store';
import CurrencyCalculator from '../CurrencyCalculator';
import CurrencyTable from '../CurrencyTable';
import style from './Layout.module.scss';

export default function Layout() {
    const isLoading = useSelector(
        (state: RootState) => state.currency.isLoading,
    );

    if (isLoading) {
        return <div className={style.container}>...Loading. Please wait.</div>;
    }
    return (
        <div className={style.container}>
            Layout
            <CurrencyTable />
            <CurrencyCalculator />
        </div>
    );
}
