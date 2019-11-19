import VT3000 from "@talentsconnect/vt-3000/dist/VT3000";

document.addEventListener('DOMContentLoaded', () => {
    console.log("Ready.");
    (new VT3000()).init();
});