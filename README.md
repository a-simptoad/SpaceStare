![Title](https://github.com/user-attachments/assets/5ef1e841-f325-4d80-b124-0bffdaf26709)

## Description
SpaceStare is an interactive 2d shooter game which utilizes gaze tracking technology through which players can control the movement of the spaceship and blink to shoot Asteroids and clear its path to reach its destination. It offers an immersive experience where players can interact with the game using just their eyes.

## Contents

1. [Core Components](#core-components)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Screenshots](#screenshots)
6. [Credits](#credits)
7. [License](#license)

## Core Components
- **Gaze Tracking:** SpaceStare allows players to control the game using eye ball movements, providing a hands-free fun experience. The tracking is enabled only in the game scene and paused in other scenes to optimize performance and accuracy.

- **Blink Detection Shooting:** Powered by Mediapipe FaceMesh library, Players shoot bullets towards asteroids by blinking. Using facial landmark tracking, the Eye Aspect Ration (EAR) is calculated which is used to detect user's blinking.

- **Optimized Performance** Initially, the game faced performance issues and lag due to computational load of gaze tracking. Removing the Kalman filter, which smoothes out the gaze predictions at the cost of extra computational power and accuracy for each moment, significantly reduced the workload on the main thread resulting in smoother gameplay.

- **Web Workers for Efficiency:** Web Workers are majorly used in the project for two operations to divide the computational work and clear the extra workload on the main thread to optimize performance. 
  1. A simple filtering algorithm for gaze points to keep the predictions smooth.  
  2. To calculate and check for threshold EAR of the user to detect blinking.

- **Phaser-Powered Gameplay:**  The game is developed using Phaser.js, a lightweight and powerful game framework that ensures smooth animations and physics handling and engaging gameplay mechanics.

- **Modern JavaScript Implementation:** The game is written using modern JavaScript features to ensure easier implementation of new features and readability of the code.

## Prerequisites
  - Ensure that your webcam is enabled and grant camera permissions.
  - A decent network connection.

## Installation

To play SpaceStare on your local machine, follow these steps: 
1. Clone this repository in your computer:    
`git clone https://github.com/MdgSpace-Soc-D-2024/SpaceStare`

2. Navigate to the project Directory:  
`cd SpaceStare`

3. Install dependencies:  
`npm install`  
> [!NOTE]
> This command only works when node.js is already installed in your computer. If not, then go to `https://nodejs.org/en/download`.

4. Start the development server:  
`npm run dev`

5. Open `http://localhost:3000` in your browser.

## Usage
  - Start the game, gaze tracking will initialize automatically.  
  >[!TIP]
  > *You can calibrate the webgazer library for better tracking of the eye movements and precise movements by clicking the Calibrate button in the Menu*
  - Move your eyes to make your ship glide along a vertical line.
  - Blink to shoot bullets to destroy upcoming asteroids and get on top of the leaderboard.

## Screenshots
![Menu Scene with start, calibrate, quit buttons](https://github.com/user-attachments/assets/4348c563-86e3-4e37-98b2-718ea3643e3a)
![Calibration scene](https://github.com/user-attachments/assets/b885fcdb-9e4d-49a6-a71c-029af5e70541)
![Game scene with spaceship and asteroids](https://github.com/user-attachments/assets/2ecdada6-dedc-494b-803f-e6abacfcff5b)
![GameOver Scene](https://github.com/user-attachments/assets/86e39838-7355-43b8-b1cc-4f547cc02d5a)

## Credits

* **Phaser.js:** Used for game development, rendering and physics.  
* **WebGazer.js:** Provides gaze tracking capabilities.  
* **MediaPipe Facemesh:** Enables facial landmark tracking to help detect blinking.  
* **Assets:** 
  - **Background** [https://piiixl.itch.io/space]
  - **Spaceship and Bullets** [https://foozlecc.itch.io/void-main-ship]
  - **Asteroid** [https://deep-fold.itch.io/pixel-planet-generator]
  
## License

This project is licensed under the MIT License. You are free to use, modify, and distribute it as per the license terms.  
[MIT LICENSE](./LICENSE)