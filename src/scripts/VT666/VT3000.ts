import VAComponentElement from "./elements/VAComponentElement";

export default class VT3000 {

    // static instance: VT3000 | null = null;

    public init() {
        this.registerElements();
    }

    /**
     * IE
     * https://github.com/webcomponents/webcomponentsjs#custom-elements-es5-adapterjs
     * https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define
     */
    private registerElements() {
        customElements.define('vt-component', VAComponentElement);
    }
}