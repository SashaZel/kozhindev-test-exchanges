// This module calculate cross-courses for different currencies

import { IRate } from '../store/currencySlice';

export function getMainCurRates(curList: IRate[]) {
    let usdToRub = 0;
    let eurToRub = 0;
    let cnyToRub = 0;
    for (let i = 0; i < curList.length; i += 1) {
        if (curList[i].currencyCode === 'USD') {
            usdToRub = curList[i].rateToRUB;
        }
        if (curList[i].currencyCode === 'EUR') {
            eurToRub = curList[i].rateToRUB;
        }
        if (curList[i].currencyCode === 'CNY') {
            cnyToRub = curList[i].rateToRUB;
        }
    }
    return {
        usdToRub,
        eurToRub,
        cnyToRub,
    };
}

export function currencyFirstToSecond(
    curFirstToRub: number | undefined,
    curSecondToRub: number | undefined,
): number {
    if (
        !curFirstToRub
        || !curSecondToRub
        || typeof curFirstToRub !== 'number'
        || typeof curSecondToRub !== 'number'
    ) {
        return 0;
    }
    const result = Math.round((curFirstToRub / curSecondToRub + Number.EPSILON) * 10000) / 10000;
    return result;
}

export function currencyToRUB(amount: number, rateToRUB: number): number {
    if (
        !amount
        || !rateToRUB
        || typeof amount !== 'number'
        || typeof rateToRUB !== 'number'
    ) {
        return 0;
    }
    const result = Math.round((amount * rateToRUB + Number.EPSILON) * 10000) / 10000;
    return result;
}

export function currencyFromRUB(amount: number, rateToRUB: number): number {
    if (
        !amount
        || !rateToRUB
        || typeof amount !== 'number'
        || typeof rateToRUB !== 'number'
    ) {
        return 0;
    }
    const result = Math.round((amount / rateToRUB + Number.EPSILON) * 10000) / 10000;
    return result;
}
