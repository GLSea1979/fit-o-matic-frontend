'use strict';

//  TODO : fuzzy search needs to be linked to html with a ng-repeat, Brian did fuzzy search during day 32-filters and directives. It will be awesome.

// module.exports = function() {

//   return function(bikes, searchTerm) {
//     console.log(bikes, searchTerm);
//     let fuzzyRegex = generateFuzzyRegex(searchTerm);

//     return bikes.filter( bike => {
//       return fuzzyRegex.test(bike.name.toUpperCase());
//     });
//   };
// };

// function generateFuzzyRegex(input) {
//   if(!input) return /.*/;
//   let fuzzyString = '.*' + input.toUpperCase().split('').join('.*') + '.*';
//   return new RexExp(fuzzyString);
// };

module.exports = function() {
  return function(bikes, searchTerm){
    let fuzzyRegex = generateFuzzyString(searchTerm);

    return bikes.filter(bike => {
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