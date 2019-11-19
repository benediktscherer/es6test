import BaseComponent from "@talentsconnect/vt-3000/dist/BaseComponent";

export default class Level1Component extends BaseComponent {

    public init(): Promise<boolean> {

        // @ts-ignore
        return new Promise((resolve, reject) => {

            console.log("Hello from Level1Component!");
            resolve(true);
        });
    }
}