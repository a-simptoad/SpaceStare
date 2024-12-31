//This file will contain the game in which the player object moves and shoots a bullet object to the asteroid object to 
//destroy them and get points.


import { Scene } from 'phaser';
import { Player } from '../gameObjects/Player';

export class Game extends Scene
{
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

        // bullet = this.physics.add.sprite(0, 0, "bullet").setOrigin(player.originX, player.originY).setScale(3);
        // bullet.setCollideWorldBounds(true, 1);
    }

    update(){
        //Playing the background animation
        this.background.anims.play("bg", true);

        var cursors = this.input.keyboard.createCursorKeys();
        if(cursors.up.isDown){
            this.player.move("up");
        }
        else if (cursors.down.isDown){
            this.player.move("down");
        }
        else{
            this.player.move();
        }

        if(cursors.space.isDown){
            this.player.shoot();
        }
    }
}
