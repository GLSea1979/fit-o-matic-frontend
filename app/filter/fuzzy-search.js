'use strict';

//  TODO : fuzzy search needs to be linked to html with a ng-repeat, Brian did fuzzy search during day 32-filters and directives 

module.exports = function() {
  return function(galleries, searchTerm) {
    let fuzzyRegex = generateFuzzyRegex(searchTerm);

    return galleries.filter( gallery => {
      return fuzzyRegex.test(gallery.name.toUpperCase());
    });
  };
};

function generateFuzzyRegex(input) {
  if(!input) return /.*/;
  let fuzzyString = '.*' + input.toUpperCase().split('').join('.*') + '.*';
  return new RexExp(fuzzyString);
};
