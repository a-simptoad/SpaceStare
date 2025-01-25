//This file will contain the game in which the player object moves and shoots a bullet object to the asteroid object to 
//destroy them and get points.


import { Math, Scene } from 'phaser';
import { Player } from '../gameObjects/Player';
import { Asteroid } from '../gameObjects/Asteroid';

var scoreText;

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
        this.gazeY = 400;
        this.spawnTimer = 0;
    }

    spawn(){
        // randomisation logic for generating asteroids
        var rand = Math.Between(0,512);
        this.rock = this.rocks.get(1074, rand);
    }

    create ()
    {
        // Creating a background
        this.background = this.add.sprite(0, 0, 'bg').setOrigin(0, 0);

        // Creating a new player object and passing this scene as parameter.
        this.player = new Player({scene: this});
        this.score = 0;

        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors.space.on('down', ()=>{
            this.player.shoot();
        });

        // Creating a new asteroid object --> just one for now 
        this.rocks = this.physics.add.group({
            classType: Asteroid,
            runChildUpdate: true
        });

        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });

        // Detects overlap b/w bullet and asteroid and destroys both
        this.physics.add.overlap(this.player.bullets, this.rocks, (rock, bullet) =>{
            bullet.setActive(false);
            bullet.setVisible(false);
            bullet.destroy();
            
            // rock.destroyRock();
            rock.setActive(false);
            rock.setVisible(false);
            rock.destroy();

            // Increase points
            this.score += 10;
            scoreText.setText('Score: ' + this.score);
        });

        // Detects overlap b/w player and asteroid and destroys asteroid + damages ship
        this.physics.add.overlap(this.player, this.rocks, (player, rock)=> {
            this.player.damage();
            // rock.destroyRock();
            rock.setActive(false);
            rock.setVisible(false);
            rock.destroy();
        });

        // webgazer.applyKalmanFilter(false);
        const worker = new Worker("src/scenes/filter_worker.js");

        //setting listener for prediction data
        let lastGazeUpdate = 0;
        webgazer.setGazeListener((data) =>{
            const now = performance.now();
            if(data && now - lastGazeUpdate > 50){
                worker.postMessage(data.y);
                worker.onmessage = (event) =>{
                    this.gazeY = event.data;
                };
                this.gazeY = data.y;
                lastGazeUpdate = now;
            }
        });

        // In-game quit button to change to the gameover scene
        this.add.rectangle(1024 - 50, 512 - 50, 20, 20, 0xff0000).setInteractive().on("pointerdown",()=>{
            this.scene.start("EndScene");
            this.registry.set('score', this.score);
            webgazer.pause();
        });

        // pause/resume for webgazer
        this.input.keyboard.on('keydown-P', () => webgazer.pause());
        this.input.keyboard.on('keydown-R', () => webgazer.resume());
        
    }

    update(){
        //Playing the background animation
        this.background.anims.play("bg", true);

        // Clamping the prediction value and passing it to player move function
        this.gazeY = Phaser.Math.Clamp(this.gazeY, 0, 1024);
        this.player.move(this.gazeY);

        this.spawnTimer += this.game.loop.delta; // Accumulate delta time
        if (this.spawnTimer > 2000) {
            this.spawn();
            this.spawnTimer = 0; // Reset timer
        }
    }
}
