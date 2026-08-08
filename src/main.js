import { scaleFactor } from "./constants";
import { k } from "./kaboomCtx";

k.loadSprite("spritesheet", "./spritesheet.png", {
    sliceX: 39, //length/frame size(16)
    sliceY: 31, //width/fram size(16)
    anims: {
        "idle-down": 936,
        "walk-down": {from: 936, to:939, loop:true, speed:8},
        "idle-side": 975,
        "walk-side": {from: 975, to:978, loop:true, speed:8},
        "idle-up": 1014,
        "walk-up": {from: 1014, to:1017, loop:true, speed:8},
    },
});

k.loadSprite("map", "./map.png");
k.setBackground(k.Color.fromHex("311047")) //bg template. might change later based on aesthetics

k.scene("main", async ()=>{  //code for this scene. async cuz fetch() and json() are async!
    const mapData= await(await(fetch("./map.json"))).json()
    const layers= mapData.layers;
    
    const map=k.make([k.sprite("map"), k.pos(0), k.scale(scaleFactor)]) //generating map
    const player=k.make([
        k.sprite("spritesheet", {anim: "idle-down"}), 
        k.area({shape: k.Rect(k.vec2(0,3), 10, 10),}),//collidable dimensions for player 
        k.body(),//automatic physics properties
        k.anchor("center"),//trial and error with respect to spawn point
        k.pos(),//put data from tiled spawn point
        k,scale(scaleFactor),
        {//properties for the array
            speed: 250,
            direction: "down",
            isInDialogue: false,
        },
        "player", //tag for collision check with onCollide()
        ]);//play around with shape vec coords to see which is best
    
        for(const layer of layers){
            if(layer.name==="boundaries"){
                for(const boundary of layer.objects){
                    map.add([
                        k.area({
                            shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
                        }),
                        k.body({isStatic: true}),
                        k.pos(boundary.x, boundary.y),
                        boundary.name,
                    ]);

                    if(boundary.name){
                        player.onCollide(boundary.name, ()=>{
                            player.isInDialogue=true;
                            //TODO-DIALOGUE TEXT
                        });
                    }
                }
            }
        }
});

k.go("main");
