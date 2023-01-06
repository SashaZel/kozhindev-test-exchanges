import React from 'react';
import CurrencyCalculator from '../CurrencyCalculator';
import CurrencyTable from '../CurrencyTable';
import style from './Layout.module.scss';

export default function Layout() {
    return (
        <div className={style.container}>
            <CurrencyCalculator />
            <CurrencyTable />
        </div>
    );
}
