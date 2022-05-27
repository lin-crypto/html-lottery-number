let winNumber = [1, 2, 3, 4, 5, 6];
let winNumberColors = ["yellow", "green", "cyan", "blue", "purple", "pink"];
let userNumbers = [[1, 3, 4, 7, 4, 6], [1, 2, 2, 4, 5, 6]];

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
    return 6 - matchCount > i ? '<span class="' + (matchCount == 0 ? 'only_one_number' : 'user_number') + ' unmatched">' + number + (userNumber[i] == winNumber[i] ? '<span class="check-mark">&#10004;</span></span>' : '<span class="wrong-mark">&#10005;</span></span>') : '';
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
    return 6 - matchCount <= i ? '<span class="' + (matchCount == 0 ? 'only_one_number' : 'user_number') + ' matched">' + number + (userNumber[i] == winNumber[i] ? '<span class="check-mark">&#10004;</span></span>' : '<span class="wrong-mark">&#10005;</span></span>') : '';
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
        <span class="wrong-number-container">` + wrongNumbers.join('') +`</span>
      </div>` : 
      correctCount == 6 ? 
        `<div class="all-number-container">
          <span class="correct-numbers-container">` + correctNumbers.join('') + `</span>
        </div>` : 
        `<div class="all-number-container">
          <span class="wrong-number-container">` + wrongNumbers.join('') + `</span>
          <span class="correct-numbers-container">` + correctNumbers.join('') + `</span>
        </div>
    </div>`);
});

document.getElementById("user_number_list").innerHTML = user.join('');
document.getElementById("win_number_container").innerHTML = win.join('');
