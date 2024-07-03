const pause = async(speed:number): Promise<void> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 450/speed);
    });
}

export default pause;