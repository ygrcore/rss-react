import { getColorForType } from "./colorsForTypes";

describe('getColorForType', () => {
  it('returns "lightyellow" for type "bug"', () => {
    const color = getColorForType('bug');
    expect(color).toBe('lightyellow');
  });

  it('returns "lightsalmon" for type "fire"', () => {
    const color = getColorForType('fire');
    expect(color).toBe('lightsalmon');
  });
  it('returns "lightgreen" for type "grass"', () => {
    const color = getColorForType('grass');
    expect(color).toBe('lightgreen');
  });
  it('returns "lightblue" for type "water"', () => {
    const color = getColorForType('water');
    expect(color).toBe('lightblue');
  });
  it('returns "lightgray" for type "normal"', () => {
    const color = getColorForType('normal');
    expect(color).toBe('lightgray');
  });

  it('returns "lightseagreen" for type "poison"', () => {
    const color = getColorForType('poison');
    expect(color).toBe('lightseagreen');
  });
  it('returns "yellow" for type "electric"', () => {
    const color = getColorForType('electric');
    expect(color).toBe('yellow');
  });
  it('returns "sandybrown" for type "ground"', () => {
    const color = getColorForType('ground');
    expect(color).toBe('sandybrown');
  });
  it('returns "pink" for type "fairy"', () => {
    const color = getColorForType('fairy');
    expect(color).toBe('pink');
  });
  it('returns "crimson" for type "fighting"', () => {
    const color = getColorForType('fighting');
    expect(color).toBe('crimson');
  });
  it('returns "lightpink" for type "psychic"', () => {
    const color = getColorForType('psychic');
    expect(color).toBe('lightpink');
  });
  it('returns "darkkhaki" for type "rock"', () => {
    const color = getColorForType('rock');
    expect(color).toBe('darkkhaki');
  });
  it('returns "pink" for type "fairy"', () => {
    const color = getColorForType('fairy');
    expect(color).toBe('pink');
  });
  it('returns "ghostwhite" for type "ghost"', () => {
    const color = getColorForType('ghost');
    expect(color).toBe('ghostwhite');
  });
  it('returns "aliceblue" for type "ice"', () => {
    const color = getColorForType('ice');
    expect(color).toBe('aliceblue');
  });
  it('returns "mediumpurple" for type "dragon"', () => {
    const color = getColorForType('dragon');
    expect(color).toBe('mediumpurple');
  });
  it('returns "lightskyblue" for type "flying"', () => {
    const color = getColorForType('flying');
    expect(color).toBe('lightskyblue');
  });

  it('returns "gray" for unknown type', () => {
    const color = getColorForType('unknownType');
    expect(color).toBe('gray');
  });

  it('returns "gray" for empty type', () => {
    const color = getColorForType('');
    expect(color).toBe('gray');
  });

  it('returns "gray" for type with spaces', () => {
    const color = getColorForType('   ');
    expect(color).toBe('gray');
  });
});
