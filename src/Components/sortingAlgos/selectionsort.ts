import { swap } from "../../helper/swap";

export const SelectionSort = async (array:number[]) => {
    const motions = [];
    for (let i = 0; i < array.length-1; i++) {
        let minIndex = i
        //loop through unsorted array
        for(let j = i+1; j<array.length; j++){
            if(array[j] < array[minIndex]){
                minIndex = j
            }
            motions.push([j, minIndex, 'dontswap'])
        }
        await swap(array, i, minIndex);
        motions.push([i, minIndex, 'swap'])
    }
    return motions
}