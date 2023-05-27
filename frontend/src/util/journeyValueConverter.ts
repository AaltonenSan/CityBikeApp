/** Convert seconds to full minutes*/
export const durationInMinutes = (duration: number): number => {
  return Math.floor(duration / 60);
};

/** Convert meters to rounded kilometers */
export const distanceInKm = (distance: number): string => {
  return (Math.round((distance / 1000) * 10) / 10).toFixed(1);
};
