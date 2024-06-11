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
