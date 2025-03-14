import { _capitalize } from './helpers.core.js';
export function _lookup(table, value, cmp) {
    cmp = cmp || ((index) => table[index] < value);
    let hi = table.length - 1;
    let lo = 0;
    let mid;
    while (hi - lo > 1) {
        mid = (lo + hi) >> 1;
        if (cmp(mid)) {
            lo = mid;
        }
        else {
            hi = mid;
        }
    }
    return { lo, hi };
}
/**
 * Binary search
 * @param table - the table search. must be sorted!
 * @param key - property name for the value in each entry
 * @param value - value to find
 * @param last - lookup last index
 * @private
 */
export const _lookupByKey = (table, key, value, last) => _lookup(table, value, last
    ? index => {
        const ti = table[index][key];
        return ti < value || ti === value && table[index + 1][key] === value;
    }
    : index => table[index][key] < value);
/**
 * Reverse binary search
 * @param table - the table search. must be sorted!
 * @param key - property name for the value in each entry
 * @param value - value to find
 * @private
 */
export const _rlookupByKey = (table, key, value) => _lookup(table, value, index => table[index][key] >= value);
/**
 * Return subset of `values` between `min` and `max` inclusive.
 * Values are assumed to be in sorted order.
 * @param values - sorted array of values
 * @param min - min value
 * @param max - max value
 */
export function _filterBetween(values, min, max) {
    let start = 0;
    let end = values.length;
    while (start < end && values[start] < min) {
        start++;
    }
    while (end > start && values[end - 1] > max) {
        end--;
    }
    return start > 0 || end < values.length
        ? values.slice(start, end)
        : values;
}
const arrayEvents = ['push', 'pop', 'shift', 'splice', 'unshift'];
export function listenArrayEvents(array, listener) {
    if (array._chartjs) {
        array._chartjs.listeners.push(listener);
        return;
    }
    Object.defineProperty(array, '_chartjs', {
        configurable: true,
        enumerable: false,
        value: {
            listeners: [listener]
        }
    });
    arrayEvents.forEach((key) => {
        const method = '_onData' + _capitalize(key);
        const base = array[key];
        Object.defineProperty(array, key, {
            configurable: true,
            enumerable: false,
            value(...args) {
                const res = base.apply(this, args);
                array._chartjs.listeners.forEach((object) => {
                    if (typeof object[method] === 'function') {
                        object[method](...args);
                    }
                });
                return res;
            }
        });
    });
}
export function unlistenArrayEvents(array, listener) {
    const stub = array._chartjs;
    if (!stub) {
        return;
    }
    const listeners = stub.listeners;
    const index = listeners.indexOf(listener);
    if (index !== -1) {
        listeners.splice(index, 1);
    }
    if (listeners.length > 0) {
        return;
    }
    arrayEvents.forEach((key) => {
        delete array[key];
    });
    delete array._chartjs;
}
/**
 * @param items
 */
export function _arrayUnique(items) {
    const set = new Set(items);
    if (set.size === items.length) {
        return items;
    }
    return Array.from(set);
}
