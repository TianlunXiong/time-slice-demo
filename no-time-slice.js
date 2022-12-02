let count = 1e6;

function bigTask() {
  while (count > 0) {
    new Array(1e3).fill(0);
    count -= 1;
  }
  console.log('done');
}

setTimeout(() => {
  bigTask();
}, 1000)

