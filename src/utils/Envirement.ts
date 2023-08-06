/**
 Copyright (c) 2023 MIW
 */
export const isBuildingUsingVite = () => {
  if (import.meta && import.meta.env && import.meta.env.MODE) return true;
  return false;
};
