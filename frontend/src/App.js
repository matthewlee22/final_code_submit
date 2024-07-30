import React, { useState, useEffect, useRef } from "react";
import io from 'socket.io-client';
import './App.css';
import controls from './controls.png';
import frontView from './frontView.jpg';
import sideView from './sideView.jpg';
import teampic from './teampic.jpg';
import zoomPic from './zoomPic.jpg';
import teamlogo from './teamlogo.png';
import draft from './draft.png';
import wireTrial from './wireTrial.png';
import day2_1 from './day2_1.png';
import day2_2 from './day2_2.png';
import day2_3 from './day2_3.png';
import day2_4 from './day2_4.png';
import day3_1 from './day3_1.jpg';
import day3_2 from './day3_2.png';
const socket = io('http://localhost:8000');


function App() {


  const [temp, setTemp] = useState(null);
  const [ultrasonic, setUltrasonic] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const keydown = useRef(false);
  

  useEffect(() => {
    // Listen for temperature updates
    socket.on('temp', (data) => {
      setTemp(data);
    });

    // Listen for ultrasonic updates
    socket.on('ultrasonic', (data) => {
      setUltrasonic(data);
    });

    socket.on('humidity', (data) => {
      setHumidity(data);
    });

    return () => {
      socket.off('temp');
      socket.off('ultrasonic');
      socket.off('humidity')
    };
  }, []);

  const sendDirection = (direction) => {
    socket.emit('send-direction', direction);
  };

  const sendArmValue = (value) => {
    socket.emit('send-arm-value', value);
  };
  
//start


  useEffect(() => {
    const handleKeyDown = (event) => {
     if(keydown.current === false) {
      if (event.key === 'w') {
        console.log('w pressed')
        sendDirection('forward')
        keydown.current = true;
      } else if (event.key === 's') {
        console.log('s pressed');
        sendDirection('backward')
        keydown.current = true;
      } else if (event.key === 'a') {
        console.log('a pressed');
        sendDirection('left')
        keydown.current = true;
      } else if (event.key === 'd') {
        console.log('d pressed');
        sendDirection('right')
        keydown.current = true;
      }else if(event.key === 'x'){
        console.log('x pressed')
        sendDirection('stop')
        keydown.current = true;
      }
    }
    };
  




    const handleKeyUp = () => {
      sendDirection('stop')
      keydown.current=false;

    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const [page, setPage] = useState('home'); // State to manage current page



  return (
    <>

    <div className="topnav">
        <a className={page === 'home' ? 'active' : ''} href="#" onClick={() => setPage('home')}>Home</a>
        <a className={page === ' rover controls' ? 'active' : ''} href="#" onClick={() => setPage('controls')}>Rover Controls</a>
        <a className={page === 'sensor data' ? 'active' : ''} href="#" onClick={() => setPage('sensor')}>Sensor Data</a>
        <a className={page === 'camera' ? 'active' : ''} href="#" onClick={() => setPage('camera')}>ESP-32 Camera</a>
        <a className={page === 'documentation' ? 'active' : ''} href="#" onClick={() => setPage('documentation')}>Documentation</a>
    </div>


    
    
    
    {page === 'controls' && (
      <div id="control-panel-container">
        <h1 id="header">Rover Controls</h1>
        <img id="control-image" src={controls} alt="wasd"></img>
      </div>
    )}

    {page === 'sensor' && (
      <>
        <div id="showcase-panel">
          <h2 id="temp_show">Temperature: {temp} Celcius</h2>
          <h2 id="humid_show">Humidity: {humidity}</h2>
          <h2 id="dist_show">Distance: {ultrasonic} cm</h2>
        </div>
        <p id="comment-2">Not connected right now, but does diplay.</p>
      
      </>

    )}

    {page === 'camera' && (
      <div style={{ width: '100%', height: '100%' }}>
        <iframe
        src="http://192.168.50.46/"
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Embedded Website"
        />
        <p id= "psa">the embedded website is no longer connected, but you can refer to us signing up for the dark maze or code as proof.</p>
      </div>
    )}

    {page === 'home' && (
      <>
  


        <div className="title">
          <h1 id ="teamname">Mechanical United</h1>
          {/* <img id="logo" src={teamlogo} alt="teamlogo"></img> */}
        </div>

        

        <div id="truck-pics">
            <h1 id="truck-header">Meet cybertruck! </h1>
            <img id="front-view" src={frontView} alt="front view"></img>

            <img id="side-view" src={sideView} alt="side view"></img>
        </div>

        <div id="us-pics">
            <h1 id="team-header">Meet the team!</h1>
            <img id="us" src={teampic} alt = "us"></img>
            <img id="us-again" src={zoomPic} alt = "onlinepic"></img>
            
        </div>

        <p className="caption">From left to right: Matthew, Anamika, Jiaqi, Rania </p>
        <p id="creds">Website desinged by: Anamika </p>


      </>

    )}

    {page === 'documentation' && (
      <>
        <div id="documentation">
          <h1>Documentation</h1>
        </div>
            
        <h2 id="day1">DAY 1</h2>

        <div id="pic-1"> 
          <img id="draft" src={draft} alt="design" />
          <img id="wireTrial" src={wireTrial} alt="wire trial" />
        </div>

        <div id="text-1">
        <p><strong>Matthew:</strong> The first day, I worked with the circuits and watched videos until I had a basic understanding of how to code and power each of the motors. I also came up with the first version of our arm design.</p>
        <p><strong>Rania:</strong> I popped in and out of HAcK the first day because I was at the new student orientation but worked on 3D modeling the L-shaped connector Jiaqi designed to connect the wheels to the base of our rover. I also worked on a design for the arm of our rover but I stopped working on it because Matthew developed a working model for our first version of the arm design.</p>
        <p><strong>Jiaqi:</strong> The first day we started drafting the rover, deciding on the attachment of wheels and breaking down tasks. In the afternoon we were guided and helped by an engineer. We figured out that our original design for attaching wheels on the chassis might cause tip-over issues, as figure 1 shown above. So we changed the idea to attach the wheels on 4 points for stability. Then later on we were able to find a good way to attach the wheels with an L-shape connector, as shown in figure 2.</p>
        <p><strong>Anamika:</strong> The first day the team and I spent brainstorming the design and I personally spent the day setting up the backend, frontend, and the connection between the mqtt & node server. Although the GitHub held detailed instructions, I would run into minor errors. I resolved this by using the internet or asked mentors for a nudge in the right direction.</p>
        




        </div>





        <h2 id="day2">DAY 2</h2>

        <div id="pic-2">
          <img id="day2_1" src={day2_1} alt="design" />
          <img id="day2_2" src={day2_2} alt="design" />
          <img id="day2_3" src={day2_3} alt="design" />
          <img id="day2_4" src={day2_4} alt="design" />
        </div>

        <div id="text-2">
          <p><strong>Matthew:</strong> The second day, I modified the code I had for the motors to account for two sets of wheels. Then, I communicated the circuit set up and the code set up with other members of the team. We were then able to test the rover’s movement in the field of play. On my own end, I started working with the dht11 and hcsr04 sensors to figure out how we would measure data and send it to the website. I also cadded the second prototype for the arm.</p>
          <p><strong>Rania:</strong> Upon 3D printing the L-Shape model I made on Day 1, we realized two errors with the design; One, the screw holes were too small, and two, they were too close to the edge of the model. I revised the design by enlarging the screw holes and added some width near the holes to ensure the screws wouldn’t bore through the side of the model. Additionally, I modeled and laser cut the flat-bed chassis for our rover today. Design of arm two began today; Jiaqi came up with an initial model which I then worked off of; Simultaneously, Matthew worked on what became our final arm design, which all followed a similar concept of embedding the micro servo into each joint of the arm. We sent three joints of the final arm design to be 3D printed overnight.</p>
          <p><strong>Jiaqi:</strong> On Day 2, we were able to start brainstorming a CAD model for the mechanical arm part. At first, we were expecting that the tiny holes on the micro servo could be secured with pins, but it turned out that it’s hard to achieve with a 3D printer and the design doesn't physically make sense. However, I realized we can make a hole that fits the micro servo's motion part and use screws to stabilize it. As shown, that’s the draft of the idea. Then Rania was able to implement the idea.</p>
          <p><strong>Anamika:</strong> This day consisted of implementing Matthew's code for the rover's movement. I created a basic design for the react website and displayed the controls. Furthermore, I set up Thonny which enabled us to upload code to the pi and to allow us to control the rover without connecting to my laptop.</p>
        </div>





        <h2 id="day3">DAY 3</h2>

        <div id="pic-3">

          <img id="day3_1" src={day3_1} alt="design" />
          <img id="day3_2" src={day3_2} alt="design" />

        </div>

        <div id="text-3">
          <p><strong>Matthew:</strong> The morning of the final day, we fixed an error related to the wheels’ movement. We then quickly set up the sensors and relayed their information to the website. A sleep call added to the code at this time created problems when it came to the rover's movement. We were able to set up the camera and add it to the website, but the rest of the day was dedicated to troubleshooting errors with the circuits, code, and physical design of the chassis and arm.</p>
          <p><strong>Rania:</strong> Though one of the 3D printers failed, resulting in two joints of our arm not printing, the other 3D print job was successful and the first joint of our arm printed. This allowed us to alter some issues we noticed with the first version of the first joint, like the area for the screw being too thin and the notch for the micro servo attachment being too low. We also widened the pin hole and added screw holes to the notch for the micro servo attachment. Then we printed the second version of the first joint of the arm, along with re-printing the second and third joints of the arm. Additionally, we printed the claws for the arm. Today, I also designed and laser cut walls for the rover. I also designed and laser cut a container for our batteries to stabilize them.</p>
          <p><strong>Jiaqi:</strong> On Day 3, sadly, the 3D printed arm parts did not fit the micro servo's motion part, and we didn’t have more time to reprint. I tried to fix it manually by cutting the edge that blocked the space and filing the final parts. That actually worked okay, but it could be a problem for longevity. We decided to make walls for the rover so that all parts, like the breadboard and batteries, could be stored there. To ensure that the humidity and temperature sensor can work effectively, the walls have ventilation holes. Additionally, we came up with a nice idea to mechanically stabilize the walls on the chassis with screws and laser-cut dishes.</p>
          <p><strong>Anamika:</strong> On the final day, our rover went through multiple errors in relation to the motors, speed, turns, etc. We were able to resolve through this persistent troubleshooting, surfing the internet, and asking mentors for guidance when all else failed. On the positive side, I was able to design the website to display all the sensor data, establish the connection with the camera, and create the embedded live video feed.</p>
        </div>






      </>
    )}


    </>
      
        






      );
}

export default App;
