import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

const VideoWithEmotionDetection = ({ onEmotionDetected }) => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const intervalRef = useRef();
  const [emotionAverages, setEmotionAverages] = useState({
    happy: 0,
    sad: 0,
    surprised: 0,
    neutral: 0,
    disgusted: 0,
    angry: 0,
    fearful: 0,
  });

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
        .catch((err) => console.error(err));
    };

    loadModels();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    const onPlay = () => {
      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(canvas, displaySize);
      intervalRef.current = setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

        const expressions = detections.map((fd) => fd.expressions);
        expressions.forEach((expression) => {
          const highestEmotion = Object.keys(expression).reduce((a, b) => (expression[a] > expression[b] ? a : b));
          setEmotionAverages(prevState => ({
            ...prevState,
            [highestEmotion]: prevState[highestEmotion] + 1
          }));
        });
      }, 1000);

      const emotionEvaluationInterval = 10000; // 10 seconds to evaluate the dominant emotion
      const emotionEvaluationTimer = setInterval(() => {
        const dominantEmotion = Object.keys(emotionAverages).reduce((a, b) => emotionAverages[a] > emotionAverages[b] ? a : b);
        onEmotionDetected(dominantEmotion);
        setEmotionAverages({
          happy: 0,
          sad: 0,
          surprised: 0,
          neutral: 0,
          disgusted: 0,
          angry: 0,
          fearful: 0,
        });
      }, emotionEvaluationInterval);

      return () => {
        clearInterval(emotionEvaluationTimer);
      };
    };

    video.addEventListener("play", onPlay);

    return () => {
      clearInterval(intervalRef.current);
      video.removeEventListener("play", onPlay);
    };
  }, [emotionAverages]);

  return (
    <div className="video-container">
      <video ref={videoRef} autoPlay muted width="720" height="560" />
      <canvas ref={canvasRef} />
    </div>
  );
};

export default VideoWithEmotionDetection;
