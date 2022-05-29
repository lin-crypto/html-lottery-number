let winNumber = [1, 2, 3, 4, 5, 6];
let winNumberColors = ["yellow", "green", "cyan", "blue", "purple", "pink"];
let userNumbers = [[1, 3, 4, 4, 5, 6], [1, 2, 3, 3, 5, 6]];
let w, h;
w = document.documentElement.clientWidth;
h = document.documentElement.clientHeight;

function displayWindowSize(){
  if(w != document.documentElement.clientWidth || h != document.documentElement.clientHeight) {
    location.reload();
    return;
  }
  w = document.documentElement.clientWidth;
  h = document.documentElement.clientHeight;
}
  
window.addEventListener("resize", displayWindowSize);

let win = winNumber.map((w, i) => {
  return `<section class="stage">
      <figure class="ball ` + winNumberColors[i] + `">
        <span class="shadow" />
      </figure>
      <span class="number">` + w + `</span>
    </section>`
});

let user = userNumbers.map((userNumber, index) => {
  let wrongNumbers = userNumber.map((number, i) => {
    let matchCount = 0;

    for (let i = 5; i >= 0; i--) {
      if (userNumber[i] == winNumber[i]) {
        matchCount++;
      } else {
        break;
      }
    }
    return 6 - matchCount > i ? '<span class="user_number unmatched">' + number + (userNumber[i] == winNumber[i] ? '<span class="check-mark">&#10004;</span></span>' : '<span class="wrong-mark">&#10005;</span></span>') : '';
  });

  let correctNumbers = userNumber.map((number, i) => {
    let matchCount = 0;

    for (let i = 5; i >= 0; i--) {
      if (userNumber[i] == winNumber[i]) {
        matchCount++;
      } else {
        break;
      }
    }
    return 6 - matchCount <= i ? '<span class="user_number matched">' + number + (userNumber[i] == winNumber[i] ? '<span class="check-mark">&#10004;</span></span>' : '<span class="wrong-mark">&#10005;</span></span>') : '';
  });

  let correctCount = 0;
  for (let i = 0; i < 6; i++) {
    if (correctNumbers[i] !== '') {
      correctCount++;
    }
  }
  return `<div class="user-number-row">
    <div class="index">` + index + `</div>` + 
    (correctCount == 0 ?
      `<div class="all-number-container">
        <span class="wrong-number-container">
          <div class="wrong-number-border" style="width: ` + (w > 768 ? 515 : 167) + `px"></div>` + 
          wrongNumbers.join('') +
        `</span>
      </div></div>` : 
      correctCount == 6 ? 
        `<div class="all-number-container">
          <span class="correct-numbers-container">
            <div class="correct-number-border" style="width: ` + (w > 768 ? 515 : 167) + `px"></div>` + 
            correctNumbers.join('') +
          `</span>
        </div></div>` : 
        `<div class="all-number-container">
          <span class="wrong-number-container">
            <div class="wrong-number-border" style="width: ` + (6 - correctCount) * (w > 768 ? 84 : 27.5) + `px"></div>` + 
            wrongNumbers.join('') + 
          `</span>
          <span class="correct-numbers-container">
            <div class="correct-number-border" style="width: ` + correctCount * (w > 768 ? 84 : 27.5) + `px; left: -` + (w > 768 ? ((6 - correctCount) * (6 - correctCount) - 22) : 0) + `px"></div>` + 
            correctNumbers.join('') + 
          `</span>
        </div>
    </div>`);
});

document.getElementById("user_number_list").innerHTML = user.join('');
document.getElementById("win_number_container").innerHTML = win.join('');
