import React, { useState, useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import '/Users/camelot/project-fea-3/client/src/assests/styles/App.css'

const VideoWithEmotionDetection = ({ onEmotionDetected }) => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [emotion, setEmotion] = useState('');
  const intervalRef = useRef();

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/models';
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
      startVideo();
    };

    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.error(err));
    };

    loadModels();
    
    // Cleanup function to stop the video when unmounting

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    
    const onPlay = () => {
      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(canvasRef.current, displaySize);
      
      intervalRef.current = setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);

        const expressions = resizedDetections.map(fd => fd.expressions);
        const highestEmotion = expressions.map(e => Object.keys(e).reduce((a, b) => e[a] > e[b] ? a : b))[0];

        if (highestEmotion !== emotion) {
          setEmotion(highestEmotion);
          onEmotionDetected(highestEmotion);
        }
      }, 1000);
    };

    if (video) {
      video.addEventListener('play', onPlay);
    }

    // Cleanup function to clear interval and remove event listener
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (video) {
        video.removeEventListener('play', onPlay);
      }
    };
  }, [onEmotionDetected]);

  return (
    <div className='video-container'>
      <video ref={videoRef} autoPlay muted width="720" height="560" />
      <canvas ref={canvasRef} />
    </div>
  );
};

export default VideoWithEmotionDetection;
