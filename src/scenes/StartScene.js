//This scene contains the starting menu which will have start/callibrate/quit buttons 
// and the title of the game.

import { Scene } from "phaser"; 
import WebGazerTracker from "../WebGazer";

export class StartScene extends Scene{
    constructor(){
        super('StartScene');
    }

    create(){

        this.background = this.add.sprite(0, 0, 'bg').setOrigin(0, 0);
        this.background.play("bg", true);
        
        this.start = this.add.rectangle(this.scale.width/2, this.scale.height/5*2, 120, 50, 0xffffff)
        .setOrigin(0.5, 0.5)
        .setAlpha(0.7)
        .setInteractive()
        .on("pointerdown", () => {this.scene.start("Game");});

        this.calibrate = this.add.rectangle(this.scale.width/2, this.scale.height/5*3, 120, 50, 0xffffff)
        .setOrigin(0.5, 0.5)
        .setAlpha(0.7)
        .setInteractive()
        .on("pointerdown", () => {this.scene.start("Calibration");});

        this.quit = this.add.rectangle(this.scale.width/2, this.scale.height/5*4, 120, 50, 0xffffff)
        .setOrigin(0.5, 0.5)
        .setAlpha(0.7)
        .setInteractive()
        .on("pointerdown", () => {/* end Scene with 0 points*/});

        this.add.text(this.scale.width/2, this.scale.height/5*2, "Start Game", {color: '#000000'}).setOrigin(0.5, 0.5);
        this.add.text(this.scale.width/2, this.scale.height/5*3, "Callibrate", {color: '#000000'}).setOrigin(0.5, 0.5);
        this.add.text(this.scale.width/2, this.scale.height/5*4, "Quit Game", {color: '#000000'}).setOrigin(0.5, 0.5);

    }
}