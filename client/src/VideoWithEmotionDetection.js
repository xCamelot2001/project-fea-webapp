import React, { useState, useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import './App.css';

const VideoWithEmotionDetection = ({ onGenerateContent }) => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [emotion, setEmotion] = useState('');

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
          videoRef.current.srcObject = stream;
        })
        .catch(err => console.error(err));
    };

    loadModels();
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    video.addEventListener('play', () => {
      const displaySize = { width: video.width, height: video.height };

      if (canvasRef.current) {
        faceapi.matchDimensions(canvasRef.current, displaySize);

        setInterval(async () => {
          const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions();
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
          faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);

          // Find the highest probability emotion
          const expressions = resizedDetections.map(fd => fd.expressions);
          const highestEmotion = expressions.map(e => Object.keys(e).reduce((a, b) => e[a] > e[b] ? a : b))[0];
          if (highestEmotion !== emotion) {
            setEmotion(highestEmotion); // Store the highest probability emotion
            sendEmotionToBackend(highestEmotion); // Send emotion to backend
          }
        }, 100);
      }
    });
  }, [emotion]);

  // Function to send the detected emotion to the backend
  const sendEmotionToBackend = async (detectedEmotion) => {
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emotion: detectedEmotion }),
      });
      const data = await response.json();
      onGenerateContent(data.generatedContent); // Invoke the callback with the generated content
    } catch (error) {
      console.error('Error sending emotion to backend:', error);
    }
  };

  return (
    <div className='video-container'>
      <video ref={videoRef} autoPlay muted width="720" height="560" />
      <canvas ref={canvasRef} />
    </div>
  );
};

export default VideoWithEmotionDetection;
