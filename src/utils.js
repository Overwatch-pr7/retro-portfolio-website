//dialogue display
export function displayDialogue(text, onDisplayEnd){
    const dialogueUI=document.getElementById("textbox-container");
    const dialogue=document.getElementById("dialogue");

    dialogueUI.style.display="block";

    //text scrolling logic
    let index=0;  
    let currentText="";
    const intervalRef= setInterval(()=>{ //this runs every 5 secs
            if(index<text.length){
                currentText+=text[index];
                dialogue.innerHTML=currentText; //beware of cross-site-scripting when u take user input via innerHTML
                index++;
                return;
            }
            clearInterval(intervalRef);
    }, 5);

    //close button functionality
    const closeButton=document.getElementById("close")

    function onCloseButtonClick(){
        onDisplayEnd();
        dialogueUI.style.display= "none";
        dialogue.innerHTML="";
        clearInterval(intervalRef);
        closeButton.removeEventListener("click", onCloseButtonClick);//recursive. remove function wihin itself
        
        // Restore focus to the game canvas so keyboard controls work again
        const canvas = document.getElementById("game");
        if (canvas) {
            canvas.focus();
        }
    }
    closeButton.addEventListener("click", onCloseButtonClick);
}

//cam dimension logic for multi screen size
export function setCamScale(k){
    const resizeFactor=k.width()/k.height();
    if (resizeFactor<1){
        k.camScale(k.vec2(1));
        return;
    }

    k.camScale(k.vec2(1.5));
}