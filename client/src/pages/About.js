import React from 'react'

function About() {
  return (
    <div>
      <p>
        Welcome to the ExprEssence app!
      </p>
      <p>
        This project is made by Hossein Khaneh Masjedi as part of the final year project for the BSc (Hons) in Computing.
      </p>
      <p>
        The app uses the face-api.js library to detect your face expression and then generates content based on your emotion and category choice.
      </p>
      <p>
        *** If you have problems accessing the camera, please make sure you have given the app permission to access it. The preferred browser is Google Chrome. ***
      </p>
      <p>
        Please take a moment to fill out the survey to help me improve the app after you're done using it :) Thank you!
      </p>
    </div>
  )
}

export default About;