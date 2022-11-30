const a = [1, 3, 7, 9, 2]
const target = 4;

function check(arr, target) {
  const cache = {};
  const result = [];

  arr.forEach((el, index) => {
    const search = target - el;

    if(search in cache) {
      result.push(cache[search], index)
    }

    cache[el] = index;
  })

  return result.length ? result : null;
}


