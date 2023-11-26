import { useRouter } from 'next/router';
import { PokeApi } from '../../services/PokeApi';
import Spinner from '../spinner/Spinner';

import styles from './PokemonDetails.module.css';

const PokemonDetails = () => {
  const router = useRouter();
  const { page } = router.query;
  const parts = page?.toString().split('/');
  const pokemonName = Array.isArray(parts) ? parts[1] : parts;

  const { data, isFetching, isLoading } = PokeApi.useGetPokemonQuery(
    pokemonName ? pokemonName : 'pikachu'
  );

  const handleClose = () => {
    router.push(`?page=${parts![0]}`);
  };

  return (
    <div>
      {(isLoading || isFetching) && <Spinner />}
      {isFetching
        ? null
        : pokemonName && (
            <>
              <button className={styles.closeDetails} onClick={handleClose}>
                Close
              </button>
              <h2>Pokemon Details for {data?.name}</h2>
              <img src={data?.image} alt={data?.name} />
              <p>Pokemon number: {data?.id}</p>
              <p>Pokemon name: {data?.name}</p>
              <p>Type: {data?.type}</p>
            </>
          )}
    </div>
  );
};

export default PokemonDetails;
