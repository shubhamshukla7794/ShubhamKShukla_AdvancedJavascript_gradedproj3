let TIME_LIMIT = 60;

let text_array = [
  "My spidey senses are tingling.",
  "I am vengeance, I am the night, I am Batman.",
  "With Great Power Comes Great Responsibility.",
  "It's not who I am underneath, but what I do that defines me.",
  "No Matter how bad things get, something good is out there, over the horizon.",
  "Just because someone stumbles and loses their path, doesn't mean they're lost forever."
];

let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let dummy_text = document.querySelector(".dummy_text");
let text_area = document.querySelector(".text_area");
let restart_btn = document.querySelector(".btn_restart");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_dummy_text = "";
let dummyTextNo = 0;
let timer = null;

function updateDummyText() {
  dummy_text.textContent = null;
  current_dummy_text = text_array[dummyTextNo];

  current_dummy_text.split('').forEach(char => {
    const charSpan = document.createElement('span')
    charSpan.innerText = char
    dummy_text.appendChild(charSpan)
  })

  if (dummyTextNo < text_array.length - 1)
    dummyTextNo++;
  else
    dummyTextNo = 0;
}

function processCurrentText() {

  curr_input = text_area.value;
  curr_input_array = curr_input.split('');

  characterTyped++;

  errors = 0;

  dummyTextSpanArray = dummy_text.querySelectorAll('span');
  dummyTextSpanArray.forEach((char, index) => {
    let typedChar = curr_input_array[index]

    if (typedChar == null) {
      char.classList.remove('correct_char');
      char.classList.remove('incorrect_char');

    } else if (typedChar === char.innerText) {
      char.classList.add('correct_char');
      char.classList.remove('incorrect_char');

    } else {
      char.classList.add('incorrect_char');
      char.classList.remove('correct_char');

      errors++;
    }
  });

  error_text.textContent = total_errors + errors;

  let correctCharacters = (characterTyped - (total_errors + errors));
  let accuracyVal = ((correctCharacters / characterTyped) * 100);
  accuracy_text.textContent = Math.round(accuracyVal);

  if (curr_input.length == current_dummy_text.length) {
    updateDummyText();

    total_errors += errors;

    text_area.value = "";
  }
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;

    timeElapsed++;

    timer_text.textContent = timeLeft + "s";
  }
  else {
    finishGame();
  }
}

function finishGame() {
  clearInterval(timer);

  text_area.disabled = true;

  dummy_text.textContent = "Click on restart to start a new game.";

  restart_btn.style.display = "block";

  cpm = Math.round(((characterTyped / timeElapsed) * 60));
  wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));

  cpm_text.textContent = cpm;
  wpm_text.textContent = wpm;

  cpm_group.style.display = "block";
  wpm_group.style.display = "block";
}


function startGame() {

  resetValues();
  updateDummyText();

  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function resetValues() {
  timeLeft = TIME_LIMIT;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterTyped = 0;
  dummyTextNo = 0;
  text_area.disabled = false;

  text_area.value = "";
  dummy_text.textContent = 'Click on the area below to start the game.';
  accuracy_text.textContent = 100;
  timer_text.textContent = timeLeft + 's';
  error_text.textContent = 0;
  restart_btn.style.display = "none";
  cpm_group.style.display = "none";
  wpm_group.style.display = "none";
}