export function mapper(object, mappingDict) {
  return Object.keys(mappingDict).reduce((acc, key) => {
    acc[mappingDict[key]] = object[key];
    return acc;
  }, {});
}
