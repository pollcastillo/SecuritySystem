/**
 * @namespace Chart.helpers
 */
/**
 * An empty function that can be used, for example, for optional callback.
 */
export function noop() {
    /* noop */
}
/**
 * Returns a unique id, sequentially generated from a global variable.
 */
export const uid = (() => {
    let id = 0;
    return () => id++;
})();
/**
 * Returns true if `value` is neither null nor undefined, else returns false.
 * @param value - The value to test.
 * @since 2.7.0
 */
export function isNullOrUndef(value) {
    return value === null || value === undefined;
}
/**
 * Returns true if `value` is an array (including typed arrays), else returns false.
 * @param value - The value to test.
 * @function
 */
export function isArray(value) {
    if (Array.isArray && Array.isArray(value)) {
        return true;
    }
    const type = Object.prototype.toString.call(value);
    if (type.slice(0, 7) === '[object' && type.slice(-6) === 'Array]') {
        return true;
    }
    return false;
}
/**
 * Returns true if `value` is an object (excluding null), else returns false.
 * @param value - The value to test.
 * @since 2.7.0
 */
export function isObject(value) {
    return value !== null && Object.prototype.toString.call(value) === '[object Object]';
}
/**
 * Returns true if `value` is a finite number, else returns false
 * @param value  - The value to test.
 */
function isNumberFinite(value) {
    return (typeof value === 'number' || value instanceof Number) && isFinite(+value);
}
export { isNumberFinite as isFinite, };
/**
 * Returns `value` if finite, else returns `defaultValue`.
 * @param value - The value to return if defined.
 * @param defaultValue - The value to return if `value` is not finite.
 */
export function finiteOrDefault(value, defaultValue) {
    return isNumberFinite(value) ? value : defaultValue;
}
/**
 * Returns `value` if defined, else returns `defaultValue`.
 * @param value - The value to return if defined.
 * @param defaultValue - The value to return if `value` is undefined.
 */
export function valueOrDefault(value, defaultValue) {
    return typeof value === 'undefined' ? defaultValue : value;
}
export const toPercentage = (value, dimension) => typeof value === 'string' && value.endsWith('%') ?
    parseFloat(value) / 100
    : +value / dimension;
export const toDimension = (value, dimension) => typeof value === 'string' && value.endsWith('%') ?
    parseFloat(value) / 100 * dimension
    : +value;
/**
 * Calls `fn` with the given `args` in the scope defined by `thisArg` and returns the
 * value returned by `fn`. If `fn` is not a function, this method returns undefined.
 * @param fn - The function to call.
 * @param args - The arguments with which `fn` should be called.
 * @param [thisArg] - The value of `this` provided for the call to `fn`.
 */
export function callback(fn, args, thisArg) {
    if (fn && typeof fn.call === 'function') {
        return fn.apply(thisArg, args);
    }
}
export function each(loopable, fn, thisArg, reverse) {
    let i, len, keys;
    if (isArray(loopable)) {
        len = loopable.length;
        if (reverse) {
            for (i = len - 1; i >= 0; i--) {
                fn.call(thisArg, loopable[i], i);
            }
        }
        else {
            for (i = 0; i < len; i++) {
                fn.call(thisArg, loopable[i], i);
            }
        }
    }
    else if (isObject(loopable)) {
        keys = Object.keys(loopable);
        len = keys.length;
        for (i = 0; i < len; i++) {
            fn.call(thisArg, loopable[keys[i]], keys[i]);
        }
    }
}
/**
 * Returns true if the `a0` and `a1` arrays have the same content, else returns false.
 * @param a0 - The array to compare
 * @param a1 - The array to compare
 * @private
 */
export function _elementsEqual(a0, a1) {
    let i, ilen, v0, v1;
    if (!a0 || !a1 || a0.length !== a1.length) {
        return false;
    }
    for (i = 0, ilen = a0.length; i < ilen; ++i) {
        v0 = a0[i];
        v1 = a1[i];
        if (v0.datasetIndex !== v1.datasetIndex || v0.index !== v1.index) {
            return false;
        }
    }
    return true;
}
/**
 * Returns a deep copy of `source` without keeping references on objects and arrays.
 * @param source - The value to clone.
 */
export function clone(source) {
    if (isArray(source)) {
        return source.map(clone);
    }
    if (isObject(source)) {
        const target = Object.create(null);
        const keys = Object.keys(source);
        const klen = keys.length;
        let k = 0;
        for (; k < klen; ++k) {
            target[keys[k]] = clone(source[keys[k]]);
        }
        return target;
    }
    return source;
}
function isValidKey(key) {
    return ['__proto__', 'prototype', 'constructor'].indexOf(key) === -1;
}
/**
 * The default merger when Chart.helpers.merge is called without merger option.
 * Note(SB): also used by mergeConfig and mergeScaleConfig as fallback.
 * @private
 */
export function _merger(key, target, source, options) {
    if (!isValidKey(key)) {
        return;
    }
    const tval = target[key];
    const sval = source[key];
    if (isObject(tval) && isObject(sval)) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        merge(tval, sval, options);
    }
    else {
        target[key] = clone(sval);
    }
}
export function merge(target, source, options) {
    const sources = isArray(source) ? source : [source];
    const ilen = sources.length;
    if (!isObject(target)) {
        return target;
    }
    options = options || {};
    const merger = options.merger || _merger;
    let current;
    for (let i = 0; i < ilen; ++i) {
        current = sources[i];
        if (!isObject(current)) {
            continue;
        }
        const keys = Object.keys(current);
        for (let k = 0, klen = keys.length; k < klen; ++k) {
            merger(keys[k], target, current, options);
        }
    }
    return target;
}
export function mergeIf(target, source) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return merge(target, source, { merger: _mergerIf });
}
/**
 * Merges source[key] in target[key] only if target[key] is undefined.
 * @private
 */
export function _mergerIf(key, target, source) {
    if (!isValidKey(key)) {
        return;
    }
    const tval = target[key];
    const sval = source[key];
    if (isObject(tval) && isObject(sval)) {
        mergeIf(tval, sval);
    }
    else if (!Object.prototype.hasOwnProperty.call(target, key)) {
        target[key] = clone(sval);
    }
}
/**
 * @private
 */
export function _deprecated(scope, value, previous, current) {
    if (value !== undefined) {
        console.warn(scope + ': "' + previous +
            '" is deprecated. Please use "' + current + '" instead');
    }
}
// resolveObjectKey resolver cache
const keyResolvers = {
    // Chart.helpers.core resolveObjectKey should resolve empty key to root object
    '': v => v,
    // default resolvers
    x: o => o.x,
    y: o => o.y
};
/**
 * @private
 */
export function _splitKey(key) {
    const parts = key.split('.');
    const keys = [];
    let tmp = '';
    for (const part of parts) {
        tmp += part;
        if (tmp.endsWith('\\')) {
            tmp = tmp.slice(0, -1) + '.';
        }
        else {
            keys.push(tmp);
            tmp = '';
        }
    }
    return keys;
}
function _getKeyResolver(key) {
    const keys = _splitKey(key);
    return obj => {
        for (const k of keys) {
            if (k === '') {
                // For backward compatibility:
                // Chart.helpers.core resolveObjectKey should break at empty key
                break;
            }
            obj = obj && obj[k];
        }
        return obj;
    };
}
export function resolveObjectKey(obj, key) {
    const resolver = keyResolvers[key] || (keyResolvers[key] = _getKeyResolver(key));
    return resolver(obj);
}
/**
 * @private
 */
export function _capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export const defined = (value) => typeof value !== 'undefined';
export const isFunction = (value) => typeof value === 'function';
// Adapted from https://stackoverflow.com/questions/31128855/comparing-ecma6-sets-for-equality#31129384
export const setsEqual = (a, b) => {
    if (a.size !== b.size) {
        return false;
    }
    for (const item of a) {
        if (!b.has(item)) {
            return false;
        }
    }
    return true;
};
/**
 * @param e - The event
 * @private
 */
export function _isClickEvent(e) {
    return e.type === 'mouseup' || e.type === 'click' || e.type === 'contextmenu';
}
