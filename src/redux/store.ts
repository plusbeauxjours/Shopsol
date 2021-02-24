import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import {
    persistStore,
    persistReducer,
} from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './rootReducer';

const persistConfig = {
    key: "root",
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false
    })
})

export const persistor = persistStore(store);

export default store;