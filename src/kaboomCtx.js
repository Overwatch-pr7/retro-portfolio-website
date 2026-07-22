import kaboom from "kaboom";

//for cleaner code as project scales. global kaboom canvas context used by all other files.
export const k=kaboom({
    global: false,
    touchToMouse: true,
    canvas:document.getElementById("game") //id gaven to kaboom in index.html
})