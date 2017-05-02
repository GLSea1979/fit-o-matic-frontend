'use strict';

const bigArray = [22, 45, 34, 33, 33, 33, 12, 11, 11, 11, 10, 9, 8, 8, 8, 1, 1, 2, 3, 4];
console.log(bigArray, 'start array');

function countSort(items, min, max) {
  let count = [];
  let i = 0;
  let z = 0;

  for(i = min; i <= max; i++) {
    count[i] = 0;
  }
  console.log(i);
  for(i = 0; i < items.length; i++) {
    count[items[i]]++;
  }
  console.log(i);
  for(i = min; i < max; i++) {
    while(count[i]-- > 0) {
      console.log('inside while loop items[z]:', z, ' gets i:', i, ' attached');

      items[z++] = i;
    }
  }

  console.log(items, ': finished array');
}

countSort(bigArray, 0, 100);
