let str = 'Hello World EiEi';
const vowels = ['a', 'e', 'i', 'o', 'u'];

let newStr = '';
let i = 0;

for (let char of str) {
  if (i % 2 === 1 && vowels.includes(char.toLowerCase())) {
    char = 'x';
  }
  newStr += char;
  i++;
}

str = newStr;

console.log(str);