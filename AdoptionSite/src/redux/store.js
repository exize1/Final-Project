import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slicer/UserSlice"
import  FormsReducer  from "./slicer/FormsSlice"
import  DogReducer  from "./slicer/DogSlice"
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
    key: "root",
    version: 1,
    storage,
};


const persistedReducer = persistReducer(persistConfig, UserReducer);

export const store = configureStore({
        reducer: {
            user: persistedReducer,
            forms: FormsReducer,
            dogs: DogReducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }),
    })

export let persistor = persistStore(store);