export default function generateRandomIds() { // this function generate array of numbers from 1 to 10 in a random order
  let ids = [];
  for (let i = 1; i <= 10; i++) {
    ids.push(i);
  }
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  return ids;
}