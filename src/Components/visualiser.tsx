import { useEffect, useState } from 'react';
import {generateRandomArray} from '../helper/generator'
import {ListComponents} from '../types/types'
import ListDisplay from './listDisplay';
import { BubbleSort } from './sortingAlgos/bubblesort';
import { getListCopy } from '../helper/getListCopy';

//start by getting the generate new array working 
//1. create component to visualise the list
//2. create bubblesort button that when clicked calls
const Visualiser = () => {
    const [size, setSize] = useState<number>(20);
    const [list, setList] = useState<ListComponents[]>(generateRandomArray(size));
    let running = false
  
    const generateNewArray = () => {
      if(!running){
        setList(generateRandomArray(size));
      }
    };

    const start = async(value: number) => {
      startRun(true)
      const motions = await callAlgorithm(value)
      startRun(false)

    }
    
    const callAlgorithm = async(value: number) => {
      console.log('-----')
      if(!running){
        return;
      }
      const numberedList = getListCopy(list) 
      switch (value) {
        case 0:
            return await BubbleSort(numberedList)
            // Additional logic for case 0
            break;
        case 1:
            console.log("Case 1");
            // Additional logic for case 1
            break;
      }
    }
    
    const startRun = (value: boolean) => {
      running = value;
    }

    useEffect(() => {
  }, []);
  
  //${highlightedIndex.includes(index) ? 'highlighted' : ''}
    return (
      <>
        <div className="container">  
            <ListDisplay list={list}/>
        </div>
        <button title="new-array" onClick={generateNewArray}>Generate new array</button>
        <button title="bubbleSort" onClick={() => start(0)}>Bubble Sort</button>
      </>
    )
}
 
export default Visualiser;