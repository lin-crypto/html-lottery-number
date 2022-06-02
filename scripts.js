let winNumber = [1, 2, 3, 4, 5, 6];
let winNumberColors = ["yellow", "green", "cyan", "blue", "purple", "pink"];
let userNumbers = [[1, 2, 4, 4, 5, 6], [1, 2, 3, 3, 5, 6]];
let w, h;
width = document.documentElement.clientWidth;
height = document.documentElement.clientHeight;

function displayWindowSize(){
  if(width != document.documentElement.clientWidth || height != document.documentElement.clientHeight) {
    location.reload();
    return;
  }
  width = document.documentElement.clientWidth;
  height = document.documentElement.clientHeight;
}
  
window.addEventListener("resize", displayWindowSize);
let win = winNumber.map((w, i) => {
  return `<div style="position: absolute; top: ` + (width > 768 ? 50 : 20) + `px; left: ` + ((i + 1) * (width > 768 ? 100 : 50)) + `px">
      <section class="stage">
        <figure class="ball ` + winNumberColors[i] + `">
          <span class="shadow" />
        </figure>
        <span class="number">` + w + `</span>
      </section>
    </div>`
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
    return 6 - matchCount > i ? 
      `<div style="position: absolute; top: 0; left: ` + ((i + 1) * (width > 768 ? 100 : 50)) + `px">
        <span class="user_number unmatched">` + 
          number + (userNumber[i] == winNumber[i] ? 
          `<span class="check-mark">&#10004;</span>
        </span>
      </div>` : 
          `<span class="wrong-mark">&#10005;</span>
        </span>
      </div>`) : '';
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
    return 6 - matchCount <= i ? 
      `<div style="position: absolute; top: 0; left: ` + ((i + 1) * (width > 768 ? 100 : 50)) + `px">
        <span class="user_number matched">` + 
          number + (userNumber[i] == winNumber[i] ? 
            `<span class="check-mark">&#10004;</span>
        </span>
      </div>` : 
            `<span class="wrong-mark">&#10005;</span>
          </span>
      </div>`) : '';
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
        <span class="wrong-number-container">` +
          wrongNumbers.join('') +
        `</span>
      </div></div>` : 
        `<div class="all-number-container">
          <span class="wrong-number-container">` +
            // <div class="wrong-number-border" style="width: ` + (7 - correctCount) * (width > 768 ? 100 : 27.5) + `px"></div>` + 
            wrongNumbers.join('') + 
          `</span>
          <span class="correct-numbers-container">
            <div class="correct-number-border" style="left: ` + (width > 768 ? (7 - correctCount) * 100 - 45 : (7 - correctCount) * 50 - 22.5) + `px; width: ` + correctCount * (width > 768 ? 100 : 50) + `px;"></div>` + 
            correctNumbers.join('') + 
          `</span>
        </div>
    </div>`);
});

document.getElementById("user_number_list").innerHTML = user.join('');
document.getElementById("win_number_container").innerHTML = win.join('');
