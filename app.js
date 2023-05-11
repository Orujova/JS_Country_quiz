const final = document.getElementById("final");
const correct = document.getElementById("correct");
const wrong = document.getElementById("wrong");
const question = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const btn = document.getElementById("btn");

let currentQuiz = 0;
let correctCount = 0;
let wrongCount = 0;
let namearray = [];
let flagarray = [];

const quiz = () => {
  fetch("https://restcountries.com/v3.1/all")
    .then((a) => a.json())
    .then((data) => {
      data.map((country) => {
        question.innerHTML = "";
        namearray.push(country.name.common);
        flagarray.push(country.flags.png);
      });
      [...document.querySelectorAll(".answer")].map((a) => (a.checked = false));
      const flagImg = document.createElement("img");
      flagImg.src = flagarray[currentQuiz];
      question.append(flagImg);
      a_text.textContent = namearray[currentQuiz];
      b_text.textContent = namearray[currentQuiz + 1];
      c_text.textContent = namearray[currentQuiz + 2];
      d_text.textContent = namearray[currentQuiz + 3];
    });
};

quiz();

btn.addEventListener("click", () => {
  let selectedElement = [...document.querySelectorAll(".answer")].find(
    (a) => a.checked
  );

  if (flagarray[currentQuiz].correct === selectedElement.getAttribute("id")) {
    correctCount++;
    correct.textContent = "Duz cavab sayi :  " + correctCount;
  } else {
    wrongCount++;
    wrong.textContent = "Sehv cavab sayi :  " + wrongCount;
  }
  currentQuiz++;
  quiz();

  if (currentQuiz + 1 === flagarray.length) {
    final.style.display = "block";
  }
});
