import { ListComponents } from "../types/types";


function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a new array with random numbers from 1 to 500
export function generateRandomArray(size: number): ListComponents[] {
    return Array.from({ length: size }, () => ({ height: getRandomNumber(1, 500), cssClass: 'bar' }));
}

