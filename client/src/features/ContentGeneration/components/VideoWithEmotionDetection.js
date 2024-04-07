// VideoWithEmotionDetection.js
import React, { useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import { useEmotion } from './EmotionContext'; // Import the useEmotion hook from EmotionContext

const VideoWithEmotionDetection = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const { setEmotion } = useEmotion(); // Get the setEmotion function from the context

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
      startVideo();
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: {} })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => {
          console.error("Error starting video stream:", err);
        });
    };

    loadModels();

    // Clean up function to stop video stream on unmount
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const onPlay = async () => {
      if (!videoRef.current) return;
      
      const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
      faceapi.matchDimensions(canvasRef.current, displaySize);

      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);

        if (detections && detections.length > 0) {
          const expressions = detections[0].expressions;
          const highestEmotion = Object.keys(expressions).reduce((a, b) => expressions[a] > expressions[b] ? a : b);
          setEmotion(highestEmotion); // Set the detected emotion in the context
        }
      }, 1000);
    };

    videoRef.current.addEventListener('play', onPlay);

    return () => {
      videoRef.current.removeEventListener('play', onPlay);
    };
  }, [setEmotion]);

  return (
    <div className="video-container">
      <video ref={videoRef} autoPlay muted width="720" height="560" />
      <canvas ref={canvasRef} width="720" height="560" />
    </div>
  );
};

export default VideoWithEmotionDetection;
