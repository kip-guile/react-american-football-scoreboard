//TODO: STEP 1 - Import the useState hook.
import React from "react";
import {useState, useRef, useEffect} from "react";
import "./App.css";
import BottomRow from "./BottomRow";

function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.
  const [homeScore, sethomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  

  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const secondsPassed = useRef(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const date = new Date()
      secondsPassed.current = secondsPassed.current + 1;
      setTime(date.toLocaleTimeString());
    }, 1000);
    return () => {
      clearTimeout(timeout);
    }
  }, [time]);

  const homeTeam = "giants"

  const handler = (team, score) =>{
    if (team === homeTeam){
     return () => sethomeScore(homeScore + score);
    } else{
     return () => setAwayScore(awayScore + score);
    }
  }

  const homeTouchdown = () => {
    sethomeScore(homeScore + 7);
  };

  const homefieldGoal = () => {
    sethomeScore(homeScore + 3);
  };

  const awayTouchdown = () => {
    setAwayScore(awayScore + 7);
  };

  const awayfieldGoal = () => {
    setAwayScore(awayScore + 3);
  };

  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <div className="home">
            <h2 className="home__name">Lions</h2>

            {/* TODO STEP 3 - We need to change the hardcoded values in these divs to accept dynamic values from our state. */}

            <div className="home__score">{homeScore}</div>
          </div>
          <div className="timer">{secondsPassed.current < 900 ? secondsPassed.current : '0:15:00'}</div>
          <div className="away">
            <h2 className="away__name">Tigers</h2>
            <div className="away__score">{awayScore}</div>
          </div>
        </div>
        <BottomRow />
      </section>
      <section className="buttons">
        <div className="homeButtons">
          {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}
          
          <button className="homeButtons__touchdown" onClick={homeTouchdown}>Home Touchdown</button>
          <button className="homeButtons__touchdown" onClick={handler("lions", 50)}>Score Handler</button>
          <button className="homeButtons__fieldGoal" onClick={homefieldGoal}>Home Field Goal</button>
        </div>
        <div className="awayButtons">
          <button className="awayButtons__touchdown" onClick={awayTouchdown}>Away Touchdown</button>
          <button className="awayButtons__fieldGoal" onClick={awayfieldGoal}>Away Field Goal</button>
        </div>
      </section>
    </div>
  );
}

export default App;
