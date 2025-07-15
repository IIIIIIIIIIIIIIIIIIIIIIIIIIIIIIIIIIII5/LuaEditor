const roasts = [
  "Are you even trying?",
  "My grandma codes better than that!",
  "Did you fall asleep while typing?",
  "Try harder, noob.",
  "That’s... not quite right.",
  "Epic fail, try again.",
  "Code like you mean it!",
  "Is that your final answer?",
  "Nope, not even close.",
  "Better luck next time!"
];

let currentLesson = 0;

function getRandomRoast() {
  return roasts[Math.floor(Math.random() * roasts.length)];
}

function loadLesson() {
  const lesson = lessons[currentLesson];
  document.getElementById('instructionBox').innerText = lesson.instruction;
  document.getElementById('codeInput').value = '';
}

function checkAnswer() {
  const userCode = document.getElementById('codeInput').value;
  const lesson = lessons[currentLesson];

  if (lesson.check(userCode)) {
    alert("Correct! Moving to next lesson.");
    currentLesson++;
    if (currentLesson < lessons.length) {
      loadLesson();
    } else {
      alert("You're done! Add more lessons in lessons.js.");
    }
  } else {
    alert(getRandomRoast());
  }
}
