import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux/es/exports';
import { currencyReducer } from './currencySlice';

export const store = configureStore({
    reducer: {
        currency: currencyReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
type TAppDispatch = typeof store.dispatch;
export const useAppDispatch: ()=>TAppDispatch = useDispatch;
