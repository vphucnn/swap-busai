export function getRandomEight(array: string | any[]) {
  const randomEight: any[] = [];
  while (randomEight.length < 8) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomElement = array[randomIndex];
    if (!randomEight.includes(randomElement)) {
      randomEight.push(randomElement);
    }
  }

return randomEight;
}


export function getRandomHints(array: string | any[]) {
  const randomEight: any[] = [];
  while (randomEight.length < 8) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomElement = array[randomIndex].chips;
    const randomChipIndex = Math.floor(Math.random() * randomElement.length);
    const chip = randomElement[randomChipIndex]
    if (!randomEight.includes(chip)) {
      randomEight.push(chip);
    }
  }

return randomEight;
}

export function getRandomOneHints(array: string | any[]) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomElement = array[randomIndex].chips;
    const randomChipIndex = Math.floor(Math.random() * randomElement.length);
    const chip = randomElement[randomChipIndex]

    return chip

}
