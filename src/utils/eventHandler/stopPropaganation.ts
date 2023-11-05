export const stopPropagation = (event: React.MouseEvent<HTMLDivElement | HTMLUListElement>): void => {
  event.stopPropagation();
};