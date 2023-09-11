export const groupByContract = (xs) => {
  var grouped = {};
  
  for (var i = 0; i < xs.length; i++) {
    var p = xs[i][1].contract;
    if (!grouped[p]) {
      grouped[p] = [];
    }
    grouped[p].push(xs[i]);
  }
  return grouped;
};
