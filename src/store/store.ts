import { combineReducers, configureStore } from "@reduxjs/toolkit"
import pokedexReducer from './reducers/pokedexSlice';
import { PokeApi } from "../services/PokeApi";

const rootReducer = combineReducers({
  pokedexReducer,
  [PokeApi.reducerPath]: PokeApi.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(PokeApi.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];