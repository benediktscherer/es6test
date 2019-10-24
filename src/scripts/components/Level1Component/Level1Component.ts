import { BaseComponent } from '@talentsconnect/vt-666';

export class Level1Component extends BaseComponent {

    public init(): Promise<boolean> {

        return new Promise((resolve, reject) => {

            console.log("Hello from Level1Component!");
            resolve(true);
        });
    }
}