// FaceMesh.js
import { FaceLandmarker, FilesetResolver } from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3';

export default class FaceMesh {
  constructor() {
    this.faceLandmarker = null;
    this.video = null;
    this.webcamRunning = false;
    this.blinkDetected = false;
    this.lastVideoTime = -1;
    this.blinkThreshold = 0.02;
  }

  // Initialize the FaceLandmarker from MediaPipe
  async createFaceLandmarker() {
    const filesetResolver = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
    );
    this.faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
        delegate: "GPU"
      },
      outputFaceBlendshapes: false, // We don't need blendshapes for blink detection
      runningMode: "VIDEO",
      numFaces: 1
    });
  }

  // Check if the browser supports webcam access
  hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  // Enable webcam and start detecting
  enableCam(videoElement) {
    if (!this.faceLandmarker) {
      console.log("FaceLandmarker not loaded yet.");
      return;
    }

    this.video = videoElement;

    this.webcamRunning = !this.webcamRunning;
    const constraints = { video: true };

    if (this.webcamRunning) {
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        this.video.srcObject = stream;
        this.video.addEventListener("loadeddata", this.predictWebcam.bind(this));
      });
    } else{
      console.log("Webcam not running");
    }
  }

  // Start predicting using the webcam stream
  async predictWebcam() {
    const startTimeMs = performance.now();

    const results = await this.faceLandmarker.detectForVideo(this.video, startTimeMs);

    if (results.faceLandmarks) {
      for (const landmarks of results.faceLandmarks) {
        const leftEyeTop = landmarks[133]; // Left eye top (upper eyelid)
        const leftEyeBottom = landmarks[144]; // Left eye bottom (lower eyelid)
        const rightEyeTop = landmarks[362]; // Right eye top (upper eyelid)
        const rightEyeBottom = landmarks[374]; // Right eye bottom (lower eyelid)

        const leftEyeHeight = Math.abs(leftEyeTop.y - leftEyeBottom.y);
        const rightEyeHeight = Math.abs(rightEyeTop.y - rightEyeBottom.y);

        if (leftEyeHeight < this.blinkThreshold && rightEyeHeight < this.blinkThreshold) {
          this.blinkDetected = true;
        } else {
          this.blinkDetected = false;
        }
      }
    }
  }

  // Get the blink status
  getBlinkStatus() {
    return this.blinkDetected;
  }
}
