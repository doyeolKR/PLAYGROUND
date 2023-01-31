import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import matchSlice from "./match/match"
import liveSlice from "./live/live"
import registerTabSlice from "./register/registerTab";
import favoriteSportsSlice from "./register/favoriteSports";

const reducers = combineReducers({
    match: matchSlice,
    live: liveSlice,
    registerTab: registerTabSlice,
    favoriteSports: favoriteSportsSlice,
})

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export default store;
