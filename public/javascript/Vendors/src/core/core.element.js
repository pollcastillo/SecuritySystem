import { isNumber } from '../helpers/helpers.math.js';
class Element {
    constructor() {
        this.active = false;
    }
    tooltipPosition(useFinalPosition) {
        const { x, y } = this.getProps(['x', 'y'], useFinalPosition);
        return { x, y };
    }
    hasValue() {
        return isNumber(this.x) && isNumber(this.y);
    }
    getProps(props, final) {
        const anims = this.$animations;
        if (!final || !anims) {
            // let's not create an object, if not needed
            return this;
        }
        const ret = {};
        props.forEach((prop) => {
            ret[prop] = anims[prop] && anims[prop].active() ? anims[prop]._to : this[prop];
        });
        return ret;
    }
}
Element.defaults = {};
Element.defaultRoutes = undefined;
export default Element;
