let uniqueIdCounter = 0;

export const getUniqueId = () => {
  uniqueIdCounter += 1;
  return uniqueIdCounter;
};