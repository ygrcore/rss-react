type PokemonPerPageSelectProps = {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const PokemonPerPageSelect: React.FC<PokemonPerPageSelectProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="select-amount">
      <p className="select-title">Amount of pokemons</p>
      <select value={value} onChange={onChange}>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>
    </div>
  );
};

export default PokemonPerPageSelect;
