import { useAppSelector } from '../../../hooks/redux';

type PokemonPerPageSelectProps = {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const PokemonPerPageSelect: React.FC<PokemonPerPageSelectProps> = ({
  onChange,
}) => {
  const { itemsPerPage } = useAppSelector((state) => state.pokedexReducer);
  return (
    <div className="select-amount">
      <p className="select-title">Amount of pokemons</p>
      <select value={itemsPerPage} onChange={onChange}>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>
    </div>
  );
};

export default PokemonPerPageSelect;
