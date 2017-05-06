'use strict';

module.exports = function() {
  return function(searchObj, searchTerm){
    let fuzzyRegex = generateFuzzyString(searchTerm);

    if(searchObj) return searchObj.filter(searchChild => {
      if(searchChild.bikeName) return fuzzyRegex.test(searchChild.bikeName.toUpperCase());
      if(searchChild.bikeSizeName) return fuzzyRegex.test(searchChild.bikeSizeName.toUpperCase());
    });
  };
};

function generateFuzzyString(input) {
  if (!input) return /.*/;
  let fuzzyString = '.*' + input.toUpperCase().split('').join('') + '.*';
  console.log(fuzzyString);
  return new RegExp(fuzzyString);
}
