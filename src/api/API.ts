import axios from 'axios';
import { IRate } from '../store/currencySlice';
import { TEndpoint } from '../utils/types';
import { ORDERED_LIST_OF_CURRENCIES } from '../utils/constants';

export async function hitCbrAPI(): Promise<{ date: string; rates: IRate[], requestError: string }> {
    const result: { date: string; rates: IRate[], requestError: string } = { date: '', rates: [], requestError: '' };
    try {
        const response = await axios.get(
            'https://www.cbr-xml-daily.ru/daily_json.js',
        );
        result.date = response?.data?.Date ?? '';
        const listOfReceivedCurrencies = Object.keys(response?.data?.Valute);
        for (let i = 0; i < ORDERED_LIST_OF_CURRENCIES.length; i += 1) {
            if (
                listOfReceivedCurrencies.includes(ORDERED_LIST_OF_CURRENCIES[i])
            ) {
                const currencyCode = ORDERED_LIST_OF_CURRENCIES[i];
                const rateToRUB = Math.round(((response?.data?.Valute[ORDERED_LIST_OF_CURRENCIES[i]]?.Value || 1)
                    / (response?.data?.Valute[ORDERED_LIST_OF_CURRENCIES[i]]?.Nominal || 1) + Number.EPSILON) * 10000) / 10000;
                result.rates.push({
                    currencyCode,
                    rateToRUB,
                    searchString: '',
                    searchNumber: 0,
                });
            }
        }
    } catch (error) {
        console.error('@hitCbrAPI() ', error);
        result.requestError = 'Error @hitCbrAPI() ' + String(error);
        return result;
    }
    return result;
}

export async function hitMoexAPI(): Promise<{ date: string; rates: IRate[], requestError: string }> {
    const result: { date: string; rates: IRate[]; requestError: string } = { date: '', rates: [], requestError: '' };
    try {
        const response = await axios.get(
            'https://iss.moex.com/iss/statistics/engines/futures/markets/indicativerates/securities.json',
        );
        result.date = `${response?.data?.securities?.data[0][0]}T${response?.data?.securities?.data[0][1]}+03:00`;
        const receivedData: [string, string, string, number][] = response?.data?.securities?.data;
        const receivedCodes = receivedData.map(
            (element) => element[2].split('/')[0],
        );
        const receivedRates = receivedData.map((element) => element[3]);
        for (let i = 0; i < ORDERED_LIST_OF_CURRENCIES.length; i += 1) {
            const indexOfCurrency = receivedCodes.indexOf(
                ORDERED_LIST_OF_CURRENCIES[i],
            );
            if (indexOfCurrency !== -1) {
                result.rates.push({
                    currencyCode: receivedCodes[indexOfCurrency],
                    rateToRUB: receivedRates[indexOfCurrency],
                    searchString: '',
                    searchNumber: 0,
                });
            }
        }
    } catch (error) {
        console.error('@hitMoexAPI() ', error);
        result.requestError = 'Error @hitMoexAPI() ' + String(error);
        return result;
    }
    return result;
}

export async function hitAPI(
    endpoint: TEndpoint,
): Promise<{ date: string; rates: IRate[]; requestError: string }> {
    const result: { date: string; rates: IRate[]; requestError: string } = { date: '', rates: [], requestError: '@hitAPI Wrong Endpoint'};
    if (endpoint === 'cbr') {
        return hitCbrAPI();
    }
    if (endpoint === 'moex') {
        return hitMoexAPI();
    }
    return result;
}
