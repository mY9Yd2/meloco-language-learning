/**
 * Gets a random element from `array`
 *
 * @param array - The array to sample
 * @returns Returns the random element
 */
function sample<Type>(array: Array<Type>): Type {
  return array[Math.floor(Math.random() * array.length)];
}

export default sample;
