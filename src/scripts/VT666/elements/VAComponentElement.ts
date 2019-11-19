export default class VAComponentElement extends HTMLElement {

    get name() {
        return this.getAttribute('name');
    }

    constructor() {
        super();
    }

    connectedCallback(): void {
        console.log('find element: ', this.name);

        let path: string = 'Level1Component/Level1Component';

        import(`../../components/${path}`).then(c => {
            let vtElementClass = new c.default();
            vtElementClass.init();
        }).catch(e => {
            console.error('connectedCallback', e);
        });
    }
}