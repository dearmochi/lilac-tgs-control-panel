const hasRight = (rights: number | undefined, r: number) => !!(rights && (rights & r));

//
export {
  hasRight
};

