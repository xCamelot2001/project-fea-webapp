import React, { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";

const VideoWithEmotionDetection = ({ onEmotionDetected }) => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const intervalRef = useRef();

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

        const expressions = detections.map((fd) => fd.expressions);
        const highestEmotion = expressions.map((e) =>
          Object.keys(e).reduce((a, b) => (e[a] > e[b] ? a : b))
        )[0];
        onEmotionDetected(highestEmotion);
      }, 1000);
    };

    video.addEventListener("play", onPlay);

    return () => {
      clearInterval(intervalRef.current);
      video.removeEventListener("play", onPlay);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="video-container">
      <video ref={videoRef} autoPlay muted width="720" height="560" />
      <canvas ref={canvasRef} />
    </div>
  );
};

export default VideoWithEmotionDetection;
