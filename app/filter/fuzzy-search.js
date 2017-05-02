'use strict';

module.exports = function() {
  return function(bikes, searchTerm){
    let fuzzyRegex = generateFuzzyString(searchTerm);

    if(bikes) return bikes.filter(bike => {
      return fuzzyRegex.test(bike.bikeName.toUpperCase());
    });
  };
};

function generateFuzzyString(input) {
  if (!input) return /.*/;
  let fuzzyString = '.*' + input.toUpperCase().split('').join('') + '.*';
  console.log(fuzzyString);
  return new RegExp(fuzzyString);
}
