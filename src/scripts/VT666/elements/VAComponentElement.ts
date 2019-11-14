
export default class VAComponentElement extends HTMLElement {

    get name() {
        return this.getAttribute('name');
    }

    constructor() {
        super();
    }

    connectedCallback(): void {
        console.log('find element: ', this.name);

        let path = '/js/index/' + this.name + 'Component.js';
        // let path: string = '../../js/index/Level1Component.js';
        // let path: string = 'Level1Component';

        // let x = new components[this.name + 'Component']();
        // x.init();

        import(path).then(c => {
            let vtElementClass = new c.default();
            vtElementClass.init();
        }).catch(e => {
            console.error('connectedCallback', e);
        });
    }
}