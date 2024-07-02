import { swap } from "../../helper/swap"

export async function BubbleSort(array:number[]) {
    //loop through array 
    //loop through it a second time with n decreaing each time
    const testArray = [...array]
    testArray.sort((a, b) => a - b)
    const n = array.length
    for(let i = 0; i<n-1; i++){
        for(let j=0; j<n-1-i; j++){
            if(array[j] > array[j+1]){
                swap(array, j, j+1)
            }
        }
        console.log(array,'----')
    }
    console.log(testArray,'+++')
    if(testArray === array){
        console.log('trueeee')
    }else{
        console.log('false')

    }
}