import {VT3000} from './VT666'
import Level1Component from "./components/Level1Component/Level1Component";

export {
    Level1Component
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("Ready.");
    (new VT3000()).init();
});