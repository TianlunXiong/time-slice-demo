let count = 1e6;

const timeSlice = 10; // ms
let frameStart = 0;

let isShouldYield = () => {
  const cost = (window.performance.now() - frameStart);
  if ((cost - timeSlice) >= 0) return true;
  return false;
};

let unfinishedTask = null;

function bigTask() {
  while (!isShouldYield() && count > 0) {
    new Array(1e3).fill(0)
    count -= 1;
    // console.log('doing', count);
  }
  if (count > 0) {
    return bigTask;
  }
  console.log('done');
}

function scheduler(fn) {
  const { port1, port2 } = new MessageChannel();

  port2.onmessage = () => {
    frameStart = window.performance.now();
    unfinishedTask = fn();
    if (unfinishedTask) {
      port1.postMessage('continue')
    }
  };

  port1.postMessage('begin')
}

setTimeout(() => {
  scheduler(bigTask)
}, 1000)
