import React, {useState} from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Display = (props) => <p>{props.text} {props.state}</p>

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


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
      <Header text={"statistics"}/>
      <Display text={"good"} state={good}/>
      <Display text={"neutral"} state={neutral}/>
      <Display text={"bad"} state={bad}/>
    </>
  )

}

export default App;
