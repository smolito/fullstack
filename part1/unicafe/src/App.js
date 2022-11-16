import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allRating, setAllRatings] = useState([])

  const setToGood = (newGood) => {
    setGood(newGood)
    setAllRatings(allRating.concat(1))
    console.log("good button: ", newGood)
  }

  const setToNeutral = (newNeutral) => {
    setNeutral(newNeutral)
    setAllRatings(allRating.concat(0))
    console.log("neutral button: ", newNeutral)
    
    console.log(getAvgRating(allRating), getPercentPositive(allRating))
  }

  const setToBad = (newBad) => {
    setBad(newBad)
    setAllRatings(allRating.concat(-1))
    console.log("bad button: ", newBad)
  }

  const getAvgRating = (array) => {
    let elements = 0
  
    array.forEach(element => {
      elements = elements + element
    });
  
    return (elements/allRating.length).toFixed(2)
  }

  const getPercentPositive = (array) => {
    let countPositive = 0
    array.forEach(element => {
      if(element===1)
        countPositive++
    });
    
    return (countPositive/allRating.length).toFixed(2)
  }

  return (
    <div>
      <h1>GIVE FEEDBACK</h1>

      <Button handleClick={() => setToGood(good + 1)} text="good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setToBad(bad + 1)} text="bad" />
      
      <h2>statistics</h2>

      <Statistics
        goodValue={good}
        neutralValue={neutral}
        badValue={bad}
        numberOfRatings={allRating.length}
        avg={getAvgRating(allRating)}
        percentPosi={getPercentPositive(allRating)}
      />
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Statistics = (props) => {
  if(props.numberOfRatings===0){
    return(
      <div> No feedback has been given yet.</div>
    )
  }
  return(
    <div>
      <table>
        <StatisticLine text="good" value={props.goodValue} />
        <StatisticLine text="neutral" value={props.neutralValue} />
        <StatisticLine text="bad" value={props.badValue} />
        <StatisticLine text="all" value={props.numberOfRatings} />
        <StatisticLine text="average" value={props.avg} />
        <StatisticLine text="positive" value={props.percentPosi} />
      </table>
    </div>
  )
}

const StatisticLine = (props) => {
  // INSERTS TWO COLLUMS INTO TABLE
  return(
    <div>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </div>
  )
}

export default App
