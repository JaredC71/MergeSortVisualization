let canvas, canvaswidth, canvasheight, bar;
const resetBtn = document.getElementById("reset");
const sortBtn = document.getElementById("sort");
const arr = []; //base array, houses unsorted elements
const transit = []; // for elements currently being manipulated
const visited = []; //for elements that have been manipulated

let num_Of_Bars = 40; //how many bars will be sorted

function canvasElements() {
  canvas = document.getElementById("Canvas");
  canvas.width = canvas.height = 1000;
  canvaswidth = canvas.width;
  canvasheight = canvas.height;
  bar = canvas.getContext("2d");
}

canvasElements(); //assignment to global variables

function createBars(start, end) {
  bar.clearRect(0, 0, 1000, 1500); //clear bars
  for (let i = 0; i < num_Of_Bars; i++) {
    bar.fillStyle = "yellow";

    bar.fillRect(25 * i, 300 - arr[i], 20, arr[i]);

    if (visited[i]) {
      bar.fillStyle = "red";
      bar.fillRect(25 * i, 300 - arr[i], 20, arr[i]);
    }
  }

  for (let i = start; i <= end; i++) {
    bar.fillStyle = "blue";
    bar.fillRect(25 * i, 300 - arr[i], 18, arr[i]);
    bar.fillStyle = "green";
    bar.fillRect(25 * i, 300, 18, arr[i]);
    visited[i] = 1;
  }
}

createBars();

for (let i = 0; i < num_Of_Bars; i++) {
  arr.push(Math.round(Math.random() * 200)); //push a random number between 1 and 200 to the start array, this value will be used later to assign height
}
for (let i = 0; i < num_Of_Bars; i++) {
  transit.push(0);
  visited.push(0);
}

function mergeArray(start, end) {
  let mid = parseInt((start + end) >> 1);
  let start1 = start,
    start2 = mid + 1;
  let end1 = mid,
    end2 = end;
  let index = start;

  while (start1 <= end1 && start2 <= end2) {
    if (arr[start1] <= arr[start2]) {
      transit[index] = arr[start1];
      index = index + 1;
      start1 = start1 + 1;
    } else if (arr[start1] > arr[start2]) {
      transit[index] = arr[start2];
      index = index + 1;
      start2 = start2 + 1;
    }
  }

  while (start1 <= end1) {
    transit[index] = arr[start1];
    index = index + 1;
    start1 = start1 + 1;
  }
  while (start2 <= end2) {
    transit[index] = arr[start2];
    index = index + 1;
    start2 = start2 + 1;
  }

  index = start;
  while (index <= end) {
    arr[index] = transit[index];
    index++;
  }
}

function delcareSpeed(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
const mergeSort = async (start, end) => {
  if (start < end) {
    let mid = parseInt((start + end) >> 1);
    await mergeSort(start, mid);
    await mergeSort(mid + 1, end);
    await mergeArray(start, end);
    await createBars(start, end);

    // Waiting time is 800ms
    await delcareSpeed(200);
  }
};

const sortArray = async () => {
  await mergeSort(0, num_Of_Bars - 1);
  await createBars();

  // Code for change title1 text
  
};

createBars();
function resetArray() {
    window.location.reload();
}
sortBtn.addEventListener("click", sortArray);
resetBtn.addEventListener("click", resetArray)
