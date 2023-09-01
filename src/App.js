// import logo from './logo.svg';
// import './App.css';
// import * as tf from '@tensorflow/tfjs'
// import * as facemesh from '@tensorflow-models/facemesh'
// import Webcam from "react-webcam";
// import React , {useRef} from "react";
// import {drawMesh} from "./utilities";
//
// function App() {
//
//   //setting up references
//   const webcamRef = useRef(null)
//   const canvasRef = useRef(null)
//
//     //loading facemesh
//     const runFaceMesh = async () => {
//       const net = await facemesh.load({
//           inputResolution:{width:640 , height:480 },
//           scale:0.8,
//
//       })
//         setInterval(()=>{
//             detect(net)
//         } , 100)
//     }
//
//     //detecting
//     const detect = async(net) =>{
//       if(
//           typeof webcamRef.current !=="undefined" && webcamRef.current !== null
//            && webcamRef.current.video.readyState === 4
//       ){
//           //getting video properties
//           const video = webcamRef.current.video
//           const videoWidth = webcamRef.current.videoWidth
//           const videoHeight = webcamRef.current.videoHeight
//
//           //setting video width
//           webcamRef.current.videoWidth = videoWidth
//           webcamRef.current.videoHeight = videoHeight
//
//           //seting up canvas dimension --> for react to draw upon
//           canvasRef.current.videoWidth = videoWidth
//           canvasRef.current.videoHeight = videoHeight
//
//           //making the detection of face --> from webcam
//          const face =  await net.estimateFaces(video)
//           console.log(face)
//
//           const ctx = canvasRef.current.getContext("2d")
//           drawMesh(face , ctx)
//
//       }
//     }
//
//     runFaceMesh()
//
//   return (
//
//
//     <div className="App">
//         <header className='app_header'>
//       <Webcam
//           className='webcam_class'
//       ref={webcamRef}
//       style={{
//         position:'absolute',
//           marginLeft:'auto',
//           marginRight:'auto',
//         top:50,
//           left:0,
//           right:0,
//           textAlign:'center',
//           zIndex:9,
//           width:640,
//         height:480,
//
//
//       }}
//       />
//       <canvas
//           ref={canvasRef}
//           style={{
//             position:'absolute',
//             marginLeft:'auto',
//             marginRight:'auto',
//             top:50,
//             left:0,
//             right:0,
//             textAlign:'center',
//             zIndex:9,
//             width:640,
//             height:480,
//
//
//           }}
//       />
//         </header>
//     </div>
//
//   );
// }
//
// export default App;

// 1. Install dependencies DONE
// 2. Import dependencies DONE
// 3. Setup webcam and canvas DONE
// 4. Define references to those DONE
// 5. Load posenet DONE
// 6. Detect function DONE
// 7. Drawing utilities from tensorflow DONE
// 8. Draw functions DONE

// Face Mesh - https://github.com/tensorflow/tfjs-models/tree/master/facemesh

import React, { useRef, useEffect } from "react";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
// OLD MODEL
import * as facemesh from "@tensorflow-models/facemesh";

// NEW MODEL
// import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { drawMesh } from "./utilities";

function App() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    //  Load posenet
    const runFacemesh = async () => {
        // OLD MODEL
        const net = await facemesh.load({
          inputResolution: { width: 640, height: 480 },
          scale: 0.8,
        });
        // NEW MODEL
        // const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
        setInterval(() => {
            detect(net);
        }, 10);
    };

    const detect = async (net) => {
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            // Get Video Properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            // Set video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            // Set canvas width
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            // Make Detections
            // OLD MODEL
                  const face = await net.estimateFaces(video);
            // NEW MODEL
            // const face = await net.estimateFaces({input:video});
            console.log(face);

            // Get canvas context
            const ctx = canvasRef.current.getContext("2d");
            requestAnimationFrame(()=>{drawMesh(face, ctx)});
        }
    };

    useEffect(()=>{runFacemesh().then(r => {

    })}, [runFacemesh]);

    return (
        <div className="App">
            <header className="App-header">
                <Webcam
                    className='webcam_class'
                    ref={webcamRef}
                    style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zindex: 9,
                        width: 640,
                        height: 480,
                    }}
                />

                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zindex: 9,
                        width: 640,
                        height: 480,
                    }}
                />
            </header>
        </div>
    );
}

export default App;

