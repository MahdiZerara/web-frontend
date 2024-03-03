// Dependencies
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { AppRootStore } from '../@types';

// App Slice
const appSlice = createSlice({
    name: 'app-slice',
    initialState: {
        userInfo: {
            isLoggedIn: true
        }
    } as AppRootStore,
    reducers: {
        LoginUser(
            state: AppRootStore,
            action: {
                payload: {
                    isLoggedIn: boolean;
                };
            }
        ) {
            const { isLoggedIn } = action.payload;
            state.userInfo.isLoggedIn = isLoggedIn;
        }
    }
});

// Export app store
export const store = configureStore({
    reducer: {
        app: appSlice.reducer
    }
});

// Export app store actions
export const appSliceActions = appSlice.actions;

// Export custom Store 'useSelector' hooks
export const appUseSelector: TypedUseSelectorHook<{ app: AppRootStore }> = useSelector;

// Export custom Store 'useDispatch' hooks
export const appUseDispatch: () => typeof store.dispatch = useDispatch;
