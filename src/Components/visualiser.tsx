import { useEffect, useState } from 'react';
import {generateRandomArray} from '../helper/generator'
import {ListComponents} from '../types/types'
import ListDisplay from './listDisplay';
import { BubbleSort } from './sortingAlgos/bubblesort';
import { SelectionSort } from './sortingAlgos/selectionsort';

import { getListCopy } from '../helper/getListCopy';
import pause from '../helper/pause';

//start by getting the generate new array working 
//1. create component to visualise the list
//2. create bubblesort button that when clicked calls
const Visualiser = () => {
    const [size, setSize] = useState<number>(20);
    const [list, setList] = useState<ListComponents[]>(generateRandomArray(size));
    const [running, setRunning] = useState<boolean>(false)
    // let running = false;
    const [value, setValue] = useState<number|null>(null)
  
    const generateNewArray = () => {
      if(!running){
        setList(generateRandomArray(size));
      }
    };

    const start = async(value:number) => {
      setRunning(true)
      setValue(value);
      console.log('-------')
    }

    useEffect(() => {
      console.log(value, running)
      if (!running) {
        console.log('false')
        return;
      }

      const runAlgorithm = async () => {
        try {
          const motions = await callAlgorithm(value)
          console.log(running, '000000')
          await visualizeMotions(motions) 
          setRunning(false)
        } catch (error) {
          console.error('Error running algorithm:', error);
        }
      };

      runAlgorithm()
    }, [value]); 
    
    const callAlgorithm = async(value: number) => {
      if(!running){
        console.log('+++++----')
        return;
      }
      
      const numberedList = getListCopy(list) 
      switch (value) {
        case 0:
            return await BubbleSort(numberedList)
        case 1:
            return await SelectionSort(numberedList)
            // Additional logic for case 1
      }
    }

    const visualizeMotions = async(motions: (string | number)[][] | undefined) => {
      if(!running){
        console.log('------++++++')
        return;
      }
      if(motions!.length === 0) {
          return;
      }
      // if move length if 4, then we have to handle range part
      if(motions![0].length === 4) {
          // await visualizeMovesInRange(motions);
      }
      else {
          await visualizeMotionBySwapping(motions);
      }
  };

  const visualizeMotionBySwapping = async(Motion: (string | number)[][] | undefined) => {
    while(Motion!.length > 0) {
        const currMove = Motion![0];
        // if container doesn't contains 3 elements then return
        if(currMove.length !== 3) {
            return;
        }
        else {
            const indexes: (string | number)[] = [currMove[0], currMove[1]];
            await updateElementClass(indexes, 'barc');
            if(currMove[2] === 'swap') {
                await updateList(indexes);
            }
            await updateElementClass(indexes, 'bar');
        }

        Motion!.shift();
    }
  };

  const updateList = async(indexes:(string | number)[]) => {
      const array = [...list];
      const stored = array[indexes[0]].height;
      array[indexes[0]].height = array[indexes[1]].height;
      array[indexes[1]].height = stored;
      await updateStateChanges(array);
  };

  const updateElementClass = async(indexes:(string | number)[], classType:string) => {
      const array = [...list];
      for(let i = 0 ; i < indexes.length ; ++i) {
          array[indexes[i]].cssClass = classType;
      }
      await updateStateChanges(array);
  };

  const updateStateChanges = async(newList:ListComponents[]) => {
    setList(() => {
      return [...newList];
    });
    await pause(10);

  };
  
  
  //${highlightedIndex.includes(index) ? 'highlighted' : ''}
    return (
      <>
        <div className="container">  
            <ListDisplay list={list}/>
        </div>
        <button title="new-array" onClick={generateNewArray}>Generate new array</button>
        <button title="bubbleSort" onClick={() => start(0)} disabled={running}>Bubble Sort</button>
        <button title="selectionSort" onClick={() => start(1)}disabled={running}>Selection Sort</button>
      </>
    )
}
 
export default Visualiser;