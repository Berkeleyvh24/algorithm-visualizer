import { useEffect, useRef, useState } from 'react';
import './App.css'

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Define the size of the array
const arraySize: number = 25; // Change this to your desired array size

// Function to generate a new array with random numbers from 1 to 500
function generateRandomArray(size: number): number[] {
  return Array.from({ length: size }, () => getRandomNumber(1, 500));
}

//visualise the bars as random heights on the screen
//create the new array function that creates a new random set of bars
//loop through the array and colour it differently
//switch two elements if the previous value is larger than the current value
function App() {
  const [randomArray, setRandomArray] = useState<number[]>(generateRandomArray(arraySize));
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const generateNewArray = () => {
    setRandomArray(generateRandomArray(arraySize));
    setHighlightedIndex(null);
  };

  const bubbleSort = () => {
    let currentIndex = 0;
    let n = 0

    const intervalId = setInterval(() => {
      if(currentIndex < randomArray.length -n ) {
        if(randomArray[currentIndex] > randomArray[currentIndex+1] ){
          const temp = randomArray[currentIndex]
          randomArray[currentIndex] = randomArray[currentIndex+1]
          randomArray[currentIndex+1] = temp
        }
        setHighlightedIndex(currentIndex);
        currentIndex++;
        setHighlightedIndex(currentIndex);

      }else{
        if(n > randomArray.length){
          clearInterval(intervalId);
        }
        n++;
        currentIndex = 0;
      }
      
    }, 25);
  }

  useEffect(() => {
    
  }, []);


  return (
    <>
      <div className="container">
      {randomArray.map((num, index) => (
          <div style={{ height: `${num}px`}}  className={`bar ${index === highlightedIndex ? 'highlighted' : ''}`} key={index}></div>
        ))}
      </div>
      <button title="new-array" onClick={generateNewArray}>Generate new array</button>
      <button title="bubble-sort" onClick={bubbleSort}>Bubble Sort</button>

    </>
  )
}



export default App
