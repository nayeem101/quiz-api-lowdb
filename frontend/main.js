"use strict";
(async () => {
  const url = "http://localhost:4000/quizes";
  //get all quizes
  async function getQuizes() {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    return data;
  }

  //render to ui
  async function renderUi() {
    //call getQuizes
    let quizes = await getQuizes();
    let tbody = document.getElementById("table-body");

    let quizStr = "";
    quizes.forEach((quiz, index) => {
      quizStr += `<tr>
                <td>${index + 1}</td>
                <td>${quiz.id}</td>
                <td>${quiz.question}</td>
                <td>${quiz.answer}</td>
                <td>${JSON.stringify(quiz.options)}</td>
              </tr>`;
    });
    tbody.innerHTML = quizStr;
  }

  await renderUi();
})();
