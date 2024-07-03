export const swap = async(array: number[], indexOne: number, indexTwo: number) => {
    const temp = array[indexOne]
    array[indexOne] = array[indexTwo]
    array[indexTwo] = temp
}