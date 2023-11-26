'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import pokedexReducer from './reducers/pokedexSlice';
import { PokeApi } from '../services/PokeApi';
import { MakeStore, createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({
  pokedexReducer,
  [PokeApi.reducerPath]: PokeApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(PokeApi.middleware),
  });
};

const makeStore: MakeStore<AppStore> = () => setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
