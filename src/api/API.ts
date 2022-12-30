import axios from 'axios';
import { IRate, TEndpoint } from '../store/currencySlice';
import { ORDERED_LIST_OF_CURRENCIES } from '../utils/constants';

export async function hitCbrAPI() {
    const result = { date: '', rates: [] };
    try {
        const response = await axios.get(
            'https://www.cbr-xml-daily.ru/daily_json.js',
        );
        //console.log(response);
        result.date = response?.data?.Date ?? '';
        const listOfReceivedCurrencies = Object.keys(response?.data?.Valute);
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < ORDERED_LIST_OF_CURRENCIES.length; i++) {
            if (
                listOfReceivedCurrencies.includes(ORDERED_LIST_OF_CURRENCIES[i])
            ) {
                //const rateItem = {};
                const currencyCode = ORDERED_LIST_OF_CURRENCIES[i];
                const rateToRUB = response?.data?.Valute[ORDERED_LIST_OF_CURRENCIES[i]]?.Value || 0;
                result.rates.push({ currencyCode, rateToRUB });
            }
        }
    } catch (error) {
        console.error(error);
    }
    //console.log(result);
    return result;
}

export async function hitAPI(endpoint: TEndpoint): Promise<{ date: string, rates: IRate[] }> {
    const result = { date: '', rates: []};
    if (endpoint === 'cbr') {
        return hitCbrAPI();
    }
    return result;
}
