import { useEffect, useState } from 'react';
import {generateRandomArray} from '../helper/generator'
import {ListComponents} from '../types/types'
import ListDisplay from './listDisplay';
import { BubbleSort } from './sortingAlgos/bubblesort';
import { SelectionSort } from './sortingAlgos/selectionsort';

import { getListCopy } from '../helper/getListCopy';
import pause from '../helper/pause';
import { MergeSort } from './sortingAlgos/mergesort';

//start by getting the generate new array working 
//1. create component to visualise the list
//2. create bubblesort button that when clicked calls
const Visualiser = () => {
    const [size, setSize] = useState<number>(10);
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
          console.log(motions, '000000')
          await visualizeMotions(motions) 
          setRunning(false)
        } catch (error) {
          console.error('Error running algorithm:', error);
        }
      };
      runAlgorithm()
    }, [value]); 
    
    const callAlgorithm = async(value: number | null) => {
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
        case 2:
          return await MergeSort(numberedList)
              
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
          await visualizeMovesInRange(motions);
      }
      else {
          await visualizeMotionBySwapping(motions);
      }
  };

  // for visualizing range based sorting algorithms
  const visualizeMovesInRange = async(Moves) => {
    let prevRange = [];
    while (Moves.length > 0 && Moves[0].length === 4) {
        // change range only when required to avoid blinking
        if(prevRange !== Moves[0][3]) {
            await updateElementClass(prevRange, 'bar');
            prevRange = Moves[0][3];
            await updateElementClass(Moves[0][3], 'barc');
        }
        await updateElementValue([Moves[0][0], Moves[0][1]]);
        Moves.shift();
    }
    await visualizeMotions(Moves);
};

  const visualizeMotionBySwapping = async(Motions: (string | number)[][] | undefined) => {
    while(Motions!.length > 0) {
        const currMove = Motions![0];
        // if container doesn't contains 3 elements then return
        if(currMove.length !== 3) {
            await visualizeMotions(Motions);
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

        Motions!.shift();
    }
  };

  const updateElementValue = async(indexes) => {
    let array = [...list];
    array[indexes[0]].height = indexes[1];
    await updateStateChanges(array);
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
    await pause(1);

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
        <button title="selectionSort" onClick={() => start(2)}disabled={running}>Merge Sort</button>
      </>
    )
}
 
export default Visualiser;