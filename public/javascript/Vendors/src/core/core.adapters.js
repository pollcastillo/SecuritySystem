/**
 * @namespace Chart._adapters
 * @since 2.8.0
 * @private
 */
function abstract() {
    throw new Error('This method is not implemented: Check that a complete date adapter is provided.');
}
/**
 * Date adapter (current used by the time scale)
 * @namespace Chart._adapters._date
 * @memberof Chart._adapters
 * @private
 */
class DateAdapterBase {
    /**
     * Override default date adapter methods.
     * Accepts type parameter to define options type.
     * @example
     * Chart._adapters._date.override<{myAdapterOption: string}>({
     *   init() {
     *     console.log(this.options.myAdapterOption);
     *   }
     * })
     */
    static override(members) {
        Object.assign(DateAdapterBase.prototype, members);
    }
    constructor(options) {
        this.options = options || {};
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    init() { }
    formats() {
        return abstract();
    }
    parse() {
        return abstract();
    }
    format() {
        return abstract();
    }
    add() {
        return abstract();
    }
    diff() {
        return abstract();
    }
    startOf() {
        return abstract();
    }
    endOf() {
        return abstract();
    }
}
export default {
    _date: DateAdapterBase
};
