import { ListComponents } from "../types/types";

export function getListCopy (objectList: ListComponents[]): number[] {
    //take in the object list and turn it into an array
    const list : number[] = []; 
    //loop through object list, then take the height variable and add it the empty list
    objectList.forEach(obj => list.push(obj.height))
    return list
}