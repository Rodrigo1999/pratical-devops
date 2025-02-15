/**
 * Função responsável por dizer se um número está entre 2 número.
 * Posso usar intercessão ou não 
 * 
 * @example 
 * isBetween(1, 5, 4) // true - pois 5 está entre 1 e 4
 * isBetween(6, 5, 4) // false - pois 5 não está entre 6 e 4
 * isBetween([5], 5, 4) // true - pois 5 intercede ele mesmo
 * isBetween(3, 7, [7]) // true - pois 7 intercede ele mesmo
 */

export function isBetween(min: number | [number], n: number, max: number | [number]): boolean {

    const _min = Array.isArray(min) ? min[0] : min;
    const _max = Array.isArray(max) ? max[0] : max;

    let cond_1 = n > _min
    let cond_2 = n < _max

    if(Array.isArray(min)) cond_1 = n >= _min
    if(Array.isArray(max)) cond_2 = n <= _max

    return cond_1 && cond_2
}