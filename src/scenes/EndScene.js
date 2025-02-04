import { Scene } from "phaser";

export class EndScene extends Scene {
  constructor() {
    super('EndScene');
    this.players = [[], []];
    this.score = 0;
  }

  // Sort players by their scores
  sortPlayers() {
    const combined = this.players[0].map((name, index) => ({
      name: name,
      score: this.players[1][index]
    }));

    combined.sort((a, b) => b.score - a.score);

    this.players[0] = combined.map(item => item.name);
    this.players[1] = combined.map(item => item.score);

    if(this.players[0].length > 4){this.players[0].pop(); this.players[1].pop();this.sortPlayers();}
  }

  showScore() {
    var columns = 2;

    for(let i = 0; i < columns; i++){
      for(let j = 0; j<this.players[0].length; j++){
        this.add.rectangle(170 +i*400, 150 +j*90, 300, 40, 0xffffff).setOrigin(0, 0.5);
        this.add.text(300, 150 +j*90, `${this.players[0][j]}`, {color: "#000000"}).setOrigin(0.5, 0.5);
        this.add.text(720, 150+ j*90, `${this.players[1][j]}`, {color: "#000000"}).setOrigin(0.5, 0.5);
      }
    }

    this.add.rectangle(512, this.scale.height / 9 * 8, 70, 30, 0xff0000,0)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start('StartScene');
      });
  }

  setPlayerName() {

    let playerName = window.prompt("Enter Your Name: ", "");
    if (playerName && playerName.trim() !== "") {
      let playerIndex = this.players[0].indexOf(playerName); 

      if (playerIndex === -1) {
        this.players[0].push(playerName);
        this.players[1].push(this.score);
      } else {
        if (this.players[1][playerIndex] < this.score) {
          this.players[1][playerIndex] = this.score;
        }
      }

      this.sortPlayers();
      this.showScore();
    } else {
      window.alert("Please enter a valid name.");
      this.setPlayerName();
    }
  }

  getTop4() {
    this.score = this.registry.get('score'); 

    if (this.players[0].length < 4) {
      this.setPlayerName();
    } else {
      for(let i = 0; i < 4; i++) {
        if (this.players[1][i] < this.score) {
          this.setPlayerName();
          break;
        }else{
          continue;
        }
      }
      this.showScore();
    }
  }

  create() {
    this.add.sprite(0, 0, 'bg').setOrigin(0, 0).play('bg', true);
    this.add.image(this.scale.width/2, this.scale.height/7 - 30, 'score').setOrigin(0.5, 0).setScale(0.4, 0.4);
    this.add.image(this.scale.width/2, this.scale.height/9 * 8, 'retry').setOrigin(0.5, 0.5).setScale(0.35);
    this.getTop4(); 
  }
}
