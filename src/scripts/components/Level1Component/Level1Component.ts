import BaseComponent from '../../VT666/BaseComponent';

export default class Level1Component {

    public constructor() {
        console.log();
    }

    public init(): Promise<boolean> {

        // @ts-ignore
        return new Promise((resolve, reject) => {

            console.log("Hello from Level1Component!");
            resolve(true);
        });
    }
}