import { PokeApi } from '../services/PokeApi';
import Layout from './layout';
import { wrapper } from '../store/store';
import { getPreloadedPokemons } from '../services/PokeApi';
import { PokemonResult } from '../types/types';

interface HomeProps {
  cards: {
    data: PokemonResult[];
  };
}

export default function Home(data: HomeProps) {
  const newData = data.cards.data;
  // console.log(data);
  return <Layout data={newData} />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { limit, offset } = context.query;
    console.log(limit, offset);

    const data = await store.dispatch(
      getPreloadedPokemons.initiate({
        limit: Number(limit) || 150,
        offset: Number(offset) || 0,
      })
    );

    await Promise.all(store.dispatch(PokeApi.util.getRunningQueriesThunk()));
    // console.log(data);
    return {
      props: {
        cards: data,
      },
    };
  }
);
