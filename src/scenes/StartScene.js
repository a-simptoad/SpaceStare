//This scene contains the starting menu which will have start/callibrate/quit buttons 
// and the title of the game.

import { Scene } from "phaser";

export class StartScene extends Scene{

    async startwebgazer(){
        // set the regression model and start collecting tracking data.
        if (typeof webgazer !== 'undefined'){
            await webgazer.setRegression('ridge').begin();
            webgazer.pause();
            this.start.setInteractive().setAlpha(0.7);
            this.calibrate.setInteractive().setAlpha(0.7);
            this.quit.setInteractive().setAlpha(0.7);
            this.wait = false;
        }
        else{
            console.error("WebGazer.js is not loaded");
        }
    }

    constructor(){
        super('StartScene');

        // Set the video feed to false
        webgazer.showVideo(false);
        webgazer.showFaceOverlay(false);
        webgazer.showPredictionPoints(false);
        webgazer.applyKalmanFilter(false);
        this.startwebgazer();

        this.wait = true;
        
    }

    create(){
        // Background
        this.background = this.add.sprite(0, 0, 'bg').setOrigin(0, 0);
        this.background.play("bg", true);

        this.add.image(this.scale.width/2, this.scale.height/5, 'title').setOrigin(0.5, 0.5).setScale(0.8, 0.7);
        
        //Start button
        this.start = this.add.rectangle(this.scale.width/2, this.scale.height/5*2 + 40, 120, 50, 0xffffff)
        .setOrigin(0.5, 0.5)
        .setAlpha(0.3)
        .on("pointerdown", async () => {
            this.scene.start("Game");
            await webgazer.resume();
        });

        //calibrate Scene button
        this.calibrate = this.add.rectangle(this.scale.width/2, this.scale.height/5*3 + 40, 120, 50, 0xffffff)
        .setOrigin(0.5, 0.5)
        .setAlpha(0.3)
        .on("pointerdown", () => {
            this.scene.start("Calibration");
            webgazer.resume();
        });

        //Quit button
        this.quit = this.add.rectangle(this.scale.width/2, this.scale.height/5*4 + 40, 120, 50, 0xffffff)
        .setOrigin(0.5, 0.5)
        .setAlpha(0.3)
        .on("pointerdown", () => {
            this.registry.set("score", 0);
            webgazer.end();
            this.scene.start("EndScene");
        });

        this.add.text(this.scale.width/2, this.scale.height/5*2 + 40, "Start Game", {color: '#000000'}).setOrigin(0.5, 0.5);
        this.add.text(this.scale.width/2, this.scale.height/5*3 + 40, "Callibrate", {color: '#000000'}).setOrigin(0.5, 0.5);
        this.add.text(this.scale.width/2, this.scale.height/5*4 + 40, "Quit Game", {color: '#000000'}).setOrigin(0.5, 0.5);

        // Pause the webgazer module in this scene.
        webgazer.pause();

        if(!this.wait){
            this.start.setInteractive().setAlpha(0.7);
            this.calibrate.setInteractive().setAlpha(0.7);
            this.quit.setInteractive().setAlpha(0.7);
        }
    }
}