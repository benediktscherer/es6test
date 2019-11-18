import BaseComponent from '../../../VT666/BaseComponent';

export default class Level2Component extends BaseComponent {

    public init(): Promise<boolean> {

        // @ts-ignore
        return new Promise((resolve, reject) => {

            console.log("Hello from SUB Level1Component!");
            resolve(true);
        });
    }
}