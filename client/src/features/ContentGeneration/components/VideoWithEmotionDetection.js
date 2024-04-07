import React, { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";

const VideoWithEmotionDetection = ({ onEmotionDetected }) => {
  const videoRef = useRef();
  const canvasRef = useRef();

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
        .catch((err) => console.error("Error starting video stream:", err));
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
    const onPlay = () => {
      const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
      faceapi.matchDimensions(canvasRef.current, displaySize);

      const detectEmotion = async () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        const detections = await faceapi
          .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        // Draw the detections to the canvas
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

        if (detections && detections.length > 0) {
          const expressions = detections[0].expressions;
          const highestEmotion = Object.keys(expressions).reduce((a, b) => expressions[a] > expressions[b] ? a : b);
          onEmotionDetected(highestEmotion);
        }
      };

      // Run the emotion detection once every second
      const detectionInterval = setInterval(detectEmotion, 500);

      videoRef.current.addEventListener("play", () => {
        detectEmotion();
      });

      return () => {
        clearInterval(detectionInterval);
        videoRef.current.removeEventListener("play", onPlay);
      };
    };

    videoRef.current.addEventListener("play", onPlay);

    return () => {
      videoRef.current.removeEventListener("play", onPlay);
    };
  }, [onEmotionDetected]);

  return (
    <div className="video-container">
      <video ref={videoRef} autoPlay muted width="720" height="560" />
      <canvas ref={canvasRef} width="720" height="560" />
    </div>
  );
};

export default VideoWithEmotionDetection;
