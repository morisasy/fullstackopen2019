import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Statistic = (props) => {
 // const [good, neutral, bad] = props
 console.log(props)
 return (
  <div>
        <p>{props.text} {props.value} </p>   
  </div>
)

}

const Statistics = (props) => { 
  console.log('props value is', props)
  let good = props.value.good;
  let neutral = props.value.neutral;
  let bad = props.value.bad;
  let total = good + neutral + bad;
  console.log(total)
  
  if (total !==0){
    return (
      <div>
          <h2>Statistics</h2>
          <Statistic text="good" value ={good} />
          <Statistic text="neutral" value ={neutral} />
          <Statistic text="bad" value ={bad} />
          <p> all {total }</p>
          <p>average {(good - bad)/total}</p>
          <p>positive {(good/total) * 100}%</p>         
      </div>
    )
  
   } else {
     return (
     <div>
       <p>no Feedback given</p>
  
     </div>
     );
   }
}

const Button = (props) => { 
  console.log('props value is', props)
 
  const {onClick, text } = props
  return (
    <button onClick={onClick}>  {text} </button>
  )
}
// write condition for display header
const Header = props => <p>{props.value}</p>;

const App = () => {

  const [clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad : 0
  })
  

  const handleGoodClick = () => {
    const newClicks = { 
      good: clicks.good + 1, 
      neutral: clicks.neutral,
      bad: clicks.bad,

    }
    setClicks(newClicks)
  }


  const handleNeutralClick = () => {
    const newClicks = { 
      good: clicks.good, 
      neutral: clicks.neutral + 1,
      bad: clicks.bad,

    }
    setClicks(newClicks)
  }
  

  const handleBadClick = () => {
    const newClicks = { 
      good: clicks.good, 
      neutral: clicks.neutral,
      bad: clicks.bad + 1,

    }
    setClicks(newClicks)
  }
  
  

  return (
    <div>
        <div>
          <h3><Header value ="Give Feedback" /></h3>
               <Button onClick={handleGoodClick} text = "good" />
            
              <Button onClick={handleNeutralClick} text = "neutral" />
            
              <Button onClick={handleBadClick} text = "bad" />
        </div>
        <div>
            <Statistics  value ={clicks} />
       
      </div>      
        
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)