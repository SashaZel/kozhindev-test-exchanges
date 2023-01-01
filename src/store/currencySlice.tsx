import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TvalidCurrency } from '../utils/types';
import { hitAPI } from '../api/API';

export type TEndpoint = 'cbr' | 'moex';

export interface IRate {
    currencyCode: TvalidCurrency;
    rateToRUB: number;
}

interface IState {
    isLoading: boolean;
    requestError: string;
    source: TEndpoint;
    date: string;
    rates: IRate[];
}

const initialState: IState = {
    isLoading: false,
    requestError: '',
    source: 'cbr',
    date: '2022-12-28T20:00:00+03:00',
    rates: [
        { currencyCode: 'AUD', rateToRUB: 48.5922 },
        { currencyCode: 'USD', rateToRUB: 71.9778 },
        { currencyCode: 'EUR', rateToRUB: 76.0765 },
    ],
};

export const fetchExchangeRate = createAsyncThunk(
    'currency/fetchExchangeRate',
    async (endpoint: TEndpoint) => {
        const response = await hitAPI(endpoint);
        return response;
    },
);

export const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        setSource: (state, action: PayloadAction<{ source: string }>) => {
            state.source += action.payload.source;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchExchangeRate.fulfilled, (state, action) => {
            state.isLoading = false;
            state.requestError = '';
            state.date = action.payload.date;
            state.rates = action.payload.rates;
        });
        builder.addCase(fetchExchangeRate.pending, (state) => {
            state.isLoading = true;
            state.requestError = '';
        });
        builder.addCase(fetchExchangeRate.rejected, (state) => {
            state.isLoading = false;
            state.requestError = 'Ooops..! Something went wrong. API service unavailable';
        });
    },
});

export const currencyReducer = currencySlice.reducer;
export const currencyActions = currencySlice.actions;
