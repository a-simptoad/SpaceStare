let prediction = [];

self.onmessage = (event) => {
    prediction.push(event.data);
    if(prediction.length > 5){
        let sum = 0;
        for(let i = 0; i< 5; i++){
            sum += prediction[i];
        }
        sum /= 5;
        self.postMessage(sum);
        prediction.shift()
    }
}