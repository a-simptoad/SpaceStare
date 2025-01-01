//This file will contain the game in which the player object moves and shoots a bullet object to the asteroid object to 
//destroy them and get points.


import { Scene } from 'phaser';
import { Player } from '../gameObjects/Player';

export class Game extends Scene
{
    cursors=null;
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        // Creating a background
        this.background = this.add.sprite(0, 0, 'bg').setOrigin(0, 0);

        // Creating a new player object and passing this scene as parameter.
        this.player = new Player({scene: this});
        this.cursors = this.input.keyboard.createCursorKeys();

        this.cursors.space.on('down', ()=>{
            this.player.shoot();
        });
    }

    update(){
        //Playing the background animation
        this.background.anims.play("bg", true);

        
        if(this.cursors.up.isDown){
            this.player.move("up");
        }
        else if (this.cursors.down.isDown){
            this.player.move("down");
        }
        else{
            this.player.move();
        }
    }
}
