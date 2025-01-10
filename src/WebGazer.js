class WebGazerTracker {
    constructor(){
        this.gazeX = 400;
        this.gazeY = 300;

        // webgazer.showVideo(false);
        webgazer.showFaceOverlay(false);
        // webgazer.setVideoViewerSize("200", "200");
    }

    startTracking(){
        if (typeof webgazer !== 'undefined'){
            webgazer.setRegression('ridge').setGazeListener((data, elapsedTime) =>{
                if(data){
                    this.gazeX = data.x;
                    this.gazeY = data.y;
                }
            }).begin();
        }
        else{
            console.error("WebGazer.js is not loaded");
        }
    }

    getGazeCoordinates(){
        return {x: this.gazeX, y: this.gazeY};
    }

    stopTracking(){
        if(typeof webgazer !== 'undefined'){
            webgazer.end();
        }
    }
    pause(){
        webgazer.pause();
    }
    resume(){
        webgazer.resume();
    }
}

export default WebGazerTracker;