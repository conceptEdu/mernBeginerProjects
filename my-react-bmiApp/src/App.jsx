import {useState} from 'react';
import React from 'react';

const App = () => {
  const [height,setHeight]=useState("");
  const [weight,setWeight]=useState("");
  const [result,setResult]=useState("");
  
  const calculateBMI=()=>{
    if(!height || !weight){
      setResult("Please enter both height and weight!")
    return;
    }
    const heightInMeters=height/100;
    const bmi=(weight/(heightInMeters*heightInMeters)).
    toFixed(2);

    let category="";
    if(bmi<18.5) category="Under Weight";
    else if(bmi<25) category="Normal Weight";
    else if(bmi<36) category="Over Weight";
    else category="Obese";
    setResult(`Your BMI is ${bmi} : You are ${category}`);
  };
  return (
    <div>
      <div className='container'>
        <h1>BMI Calculator</h1>
        
        {/*Height */}
        <label htmlFor='height'>Height (in cm)</label>
        <input 
        type='number'
        id='height' 
        placeholder='e.g. 170 cm'
        value={height}
        onChange={(e)=>setHeight(e.target.value)}
        />

        {/*Weight */}
        <label htmlFor='weight'>Weight (in kg)</label>
        <input 
        type='number'
        id='weight' 
        placeholder='e.g. 65 kg' 
        value={weight}
        onChange={(e)=>setWeight(e.target.value)}
        />

        {/*Button */}
        <button onClick={calculateBMI}>Calculate</button>
        {/*Result*/}
        <div className='result'>{result}</div>
      </div>
    </div>
  )
};

export default App;
