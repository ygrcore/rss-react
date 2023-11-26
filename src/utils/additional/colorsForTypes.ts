export const getColorForType = (type: string) => {
  const types = type.split(',');
  const primaryType = types[0].trim();
  switch (primaryType) {
    case 'bug':
      return 'lightyellow';
    case 'fire':
      return 'lightsalmon';
    case 'grass':
      return 'lightgreen';
    case 'water':
      return 'lightblue';
    case 'normal':
      return 'lightgray';
    case 'poison':
      return 'lightseagreen';
    case 'electric':
      return 'yellow';
    case 'ground':
      return 'sandybrown';
    case 'fairy':
      return 'pink';
    case 'fighting':
      return 'crimson';
    case 'psychic':
      return 'lightpink';
    case 'rock':
      return 'darkkhaki';
    case 'ghost':
      return 'ghostwhite';
    case 'ice':
      return 'aliceblue';
    case 'dragon':
      return 'mediumpurple';
    case 'flying':
      return 'lightskyblue';
    default:
      return 'gray';
  }
};
