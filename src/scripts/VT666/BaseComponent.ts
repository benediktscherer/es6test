export default class BaseComponent {

    public config: any;

    constructor(config = {}) {
        this.config = config;
    }

    public init(): Promise<boolean> {
        throw new Error('init() must be implemented!');
    }
}