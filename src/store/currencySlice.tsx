import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TEndpoint, TvalidCurrency } from '../utils/types';
import { hitAPI } from '../api/API';

export interface IRate {
    currencyCode: TvalidCurrency;
    rateToRUB: number;
    searchString: string,
    searchNumber: number
}

export interface IState {
    isLoading: boolean;
    requestError: string;
    date: string;
    rates: IRate[];
}

const initialState: IState = {
    isLoading: false,
    requestError: '',
    date: '',
    rates: [],
};

export const fetchExchangeRate = createAsyncThunk<{ date: string, rates: IRate[], requestError: string }, string>(
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
        setSortedRates: (state, action: PayloadAction<IRate[]>) => {
            state.rates = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchExchangeRate.fulfilled, (state, action) => {
            state.isLoading = false;
            state.requestError = action.payload.requestError;
            state.date = action.payload.date;
            state.rates = action.payload.rates;
        });
        builder.addCase(fetchExchangeRate.pending, (state) => {
            state.isLoading = true;
            state.requestError = '';
        });
        builder.addCase(fetchExchangeRate.rejected, (state) => {
            state.isLoading = false;
            state.requestError = 'Ooops..! Something went wrong. API service unavailable. An Error @extraReducers @currencySlice @RTK';
        });
    },
});

export const currencyReducer = currencySlice.reducer;
export const currencyActions = currencySlice.actions;
