import { swap } from "../../helper/swap"

export async function BubbleSort(array:number[]) {
    const motions = []
    //loop through array 
    //loop through it a second time with n decreaing each time
    const n = array.length
    for(let i = 0; i<n-1; i++){
        for(let j=0; j<n-1-i; j++){
            if(array[j] > array[j+1]){
                swap(array, j, j+1)
                motions.push([j, j+1, 'swap'])
            }else{
                motions.push([j, j+1, 'dontswap'])
            }
        }
    }
    return motions
}