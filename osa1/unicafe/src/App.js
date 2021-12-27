import React, {useState} from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Display = ({text, value}) => <p>{text} {value}</p>

const All = ({states}) => {
  let sum = 0
  states.forEach(state => sum += state);
  return (
    <Display text={"all"} value={sum}/>
  )
}

const Average = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  if (total == 0) {
    return (
      <Display text={"average"} value={0}/>
    )
  }
  return (
    <Display text={"average"} value={(good - bad) / (good + neutral + bad)}/>
  )
}

const Positive = ({good, neutral, bad}) => {
  const sum = good + neutral + bad
  if (sum == 0) {
    return (
      <Display text={"positive"} value={"0 %"}/>
    )
  }
  return (
    <Display text={"positive"} value={good / sum * 100 + " %"}/>
  )

}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({good, neutral, bad}) => { 
  return (
    <>
      <Header text={"statistics"}/>
      <Display text={"good"} value={good}/>
      <Display text={"neutral"} value={neutral}/>
      <Display text={"bad"} value={bad}/>
      <All states={[good, neutral, bad]}/>
      <Average good={good} neutral={neutral} bad={bad}/>
      <Positive good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

const App = () => { 
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Header text={"give feedback"}/>
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )

}

export default App;
