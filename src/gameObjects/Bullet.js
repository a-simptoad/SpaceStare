// This is the bullet object 

//Properties-->
// Gets shooted by the player ship --> function in player class.
// has animation.
// destroyes asteroids.

import { GameObjects, Math} from "phaser";
import { Physics } from "phaser";

export class Bullet extends GameObjects.Sprite
{
    constructor(scene, x, y){
        super(scene, x, y, "bullet"); 
        this.name = "bullet";

        this.speed = Math.GetSpeed(80000 ,1);
    }

    fire(x, y, texture = "bullet"){
        this.setTexture(texture);
        this.anims.play("bullet");

        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);
    }

    update()
    {
        this.x = this.speed + this.x;

        if(this.x > this.scene.sys.canvas.width || this.x < 0){
            this.setActive(false);
            this.setVisible(false);
            this.destroy();
        }
    }
}