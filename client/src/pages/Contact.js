import React from 'react'

function Contact() {
  return (
  <div className="contact-page">
      <h1>Contact Us</h1>
      <p>If you have any questions, please don't hesitate to reach out to us:</p>
      <ul>
          <li></li>
          <li>Email: shk_css@yahoo.com</li>
          <li>Linkedin: hosseinkhanehmasjedi</li>
      </ul>
      <form action="#" method="post">
          <label htmlFor="name">Your Name:</label>
          <input type="text" id="name" name="name" required />
          <label htmlFor="email">Your Email:</label>
          <input type="email" id="email" name="email" required />
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" required></textarea>
          <button type="submit">Send Message</button>
      </form>
      <div>
          <h2>Follow Us</h2>
          <p>Stay connected through our social channels:</p>
          <a href="your_facebook_link">Facebook</a>
          <a href="your_twitter_link">Twitter</a>
          <a href="your_instagram_link">Instagram</a>
      </div>
  </div>
  )
}

export default Contact;