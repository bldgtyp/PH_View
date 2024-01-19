/**
 * Renders a decimal cell with the specified number of decimal places.
 * @param params - The parameters for the cell.
 * @param places - The number of decimal places to display (default is 2).
 * @returns The rendered decimal cell.
 */

export const ValueAsDecimal = (params: any, places: number = 2) => {
  const value = params.value ? parseFloat(params.value).toFixed(places) : "";
  return <>{value}</>;
};
