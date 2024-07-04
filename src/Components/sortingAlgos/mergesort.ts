export async function MergeSort(array:number[]) {
    console.log(array.join(' '), '][][][][][[]][][')
    const motions = []
    await divide(array, motions, 0, array.length-1);
    return motions
}

const divide = async(array: number[], motions, start: number, end: number) => {
    if(start < end) {
        const mid = Math.floor((end + start)/2);
        console.log(motions, '99999',start, '[]][[]',mid,'-----', end, '+++++')
        await divide(array, motions, start, mid);
        await divide(array, motions, mid+1, end);
        await merge(array, motions, start, mid, end);
    }
};

const merge = async(array: number[], motions, start: number,mid: number, end: number)=>{
    const sortedArray = [];
    console.log('=========')
    let i = start, j = mid+1;
    while(i <= mid && j <= end) {
        if(array[i] <= array[j]) sortedArray.push(array[i++]);
        else sortedArray.push(array[j++]);
    }
    while(i <= mid) {
        sortedArray.push(array[i++]);
    }
    while(j <= end) {
        sortedArray.push(array[j++]);
    }

    const indexes = [];
    for(let i = start ; i <= end ; ++i) {
        indexes.push(i);
    }
    for(let i = start ; i <= end ; ++i) {
        array[i] = sortedArray[i-start];
        motions.push([i, array[i], 'CHANGE_VALUE', indexes]);
    }
}
