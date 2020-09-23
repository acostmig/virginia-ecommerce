import React, { Component } from 'react';
import "./about.css";



class AboutPage extends Component {
  render() {
    
    return (

      
      
      

      <div id="about-section">
        
            
              <h1> <span style={{fontFamily:"algerian",fontSize:"1cm",}}>
                 About Us </span>
               </h1>
               
        <div style={{marginTop:"25px"}} id="card">
        <p style={{ color: "black",}}>
          Some text about who we are and what we do.
        </p>
          <p style={{ color: "black" }} >
          Resize the browser window to see that this page is responsive by the way.
          </p>
          <h2 style={{ textAlign: "center", color: "black" }}>
          Our Team
          </h2>
        <div id="row"></div>
        <div id="column"></div>
        <div id="container"></div>
        <h2 style={{ color: "black" }}>
          Virginia Florian
          </h2>
        <p id="title">CEO & Founder</p>
        <p style={{ color: "black" }}>
           text that describes me lorem ipsum ipsum lorem.
           </p>
        <p style={{ color: "black" }}>
          Virginia@example.com
          </p>
        <p><button id="button">Contact</button></p>        
                <div id="mission" style={{ textAlign: "center", color: "black", marginTop: "100px", }}>
                      <h2>Mission:</h2>
                     <p style={{ color: "black" }}>Some text that describes our mission lorem ipsum ipsum lorem.</p>
               </div>
                     <div id="vision" style={{ textAlign: "center", color: "black", marginTop: "100px", }}>
                          <h2>Vision:</h2>
                            <p style={{ color: "black" }}>
                              Some text that describes our vision lorem ipsum ipsum lorem.
                            </p>
                     </div>
               </div>
      </div>

    )
  }
}

export default AboutPage;
