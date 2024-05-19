/**
 * Gets `n` random elements at unique keys from `array` up to the
 * size of `array`
 *
 * @param array - The array to sample
 * @param n - The number of elements to sample
 * @returns Returns the random elements
 */
function sampleSize<Type>(array: Array<Type>, n: number): Array<Type> {
    const result = [...array];
    for (let index = result.length - 1; index > 0; index--) {
        const rand = Math.floor(Math.random() * (index + 1));
        [result[index], result[rand]] = [result[rand], result[index]];
    }
    return result.slice(0, n);
}

export default sampleSize;
