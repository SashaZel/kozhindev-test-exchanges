import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux/es/exports';
import { currencyReducer } from './currencySlice';

export const store = configureStore({
    reducer: {
        currency: currencyReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type TAppDispatch = typeof store.dispatch;
export const useAppDispatch: ()=>TAppDispatch = useDispatch;
