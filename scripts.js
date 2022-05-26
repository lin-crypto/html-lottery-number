let winNumber = [1, 2, 3, 4, 5, 6];
let winNumberColors = ["yellow", "green", "cyan", "blue", "purple", "pink"];
let userNumbers = [[1, 3, 4, 7, 4, 6], [1, 2, 3, 4, 5, 2]];

let win = winNumber.map((w, i) => {
  return `<section class="stage">
      <figure class="ball ` + winNumberColors[i] + `">
        <span class="shadow" />
      </figure>
      <span class="number">` + w + `</span>
    </section>`
});

let user = userNumbers.map(userNumber => {
  let checkedNumber = userNumber.map((number, i) => {
    let matchCount = 0;

    for (let i = 5; i >= 0; i--) {
      if (userNumber[i] == winNumber[i]) {
        matchCount++;
      } else {
        break;
      }
    }
    return 6 - matchCount > i ? '<span class="user_number unmatched">' + number + '</span>' : '<span class="user_number matched">' + number + '</span>';
  });
  return `<div class="user_number_container">` + checkedNumber.join('') + `</div>`
});
document.getElementById("users").innerHTML = user.join('');
document.getElementById("win_number_container").innerHTML = win.join('');
