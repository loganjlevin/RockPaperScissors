const rock = document.querySelector(".rock");
const paper = document.querySelector(".paper");
const scissors = document.querySelector(".scissors");

rock.addEventListener("click", setChoices);
paper.addEventListener("click", setChoices);
scissors.addEventListener("click", setChoices);

async function setChoices() {
  if (this.className === "rock") {
    userChoice = "rock";
    rock.classList.add("highlight");
    paper.classList.add("hide");
    scissors.classList.add("hide");
  } else if (this.className === "paper") {
    userChoice = "paper";
    paper.classList.add("highlight");
    rock.classList.add("hide");
    scissors.classList.add("hide");
  } else {
    userChoice = "scissors";
    scissors.classList.add("highlight");
    rock.classList.add("hide");
    paper.classList.add("hide");
  }
  rock.removeEventListener("click", setChoices);
  paper.removeEventListener("click", setChoices);
  scissors.removeEventListener("click", setChoices);

  compChoice = await setRandomCompChoice();

  decideWinner(userChoice, compChoice);
}

function setRandomCompChoice() {
  return new Promise((compChoice) => {
    const times = 20;
    const tags = document.querySelectorAll(".tag");

    const interval = setInterval(() => {
      var randomTag = Math.floor(Math.random() * 3);

      tags[randomTag].classList.add("highlight");

      setTimeout(() => {
        tags[randomTag].classList.remove("highlight");
      }, 100);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);

      setTimeout(() => {
        var randomTag = Math.floor(Math.random() * 3);

        tags[randomTag].classList.add("highlight");

        if (randomTag === 0) {
          compChoice("rock");
          tags[1].classList.add("hide");
          tags[2].classList.add("hide");
        } else if (randomTag === 1) {
          compChoice("paper");
          tags[0].classList.add("hide");
          tags[2].classList.add("hide");
        } else {
          compChoice("scissors");
          tags[0].classList.add("hide");
          tags[1].classList.add("hide");
        }
      }, 100);
    }, times * 100);
  });
}

function decideWinner(userChoice, compChoice) {
  const results = document.getElementById("results");
  const output = document.createElement("h1");

  if (userChoice === compChoice) {
    //draw
    output.innerHTML = `It's a draw!`;
  } else if (userChoice === "rock" && compChoice === "scissors") {
    //userwins
    output.innerHTML = `You Win!`;
  } else if (userChoice === "rock" && compChoice === "paper") {
    //user loses
    output.innerHTML = `You Lose!`;
  } else if (userChoice === "paper" && compChoice === "rock") {
    // user wins
    output.innerHTML = `You Win!`;
  } else if (userChoice === "paper" && compChoice === "scissors") {
    // user loses
    output.innerHTML = `You Lose!`;
  } else if (userChoice === "scissors" && compChoice === "paper") {
    //user wins
    output.innerHTML = `You Win!`;
  } else {
    // user loses
    output.innerHTML = `You Lose!`;
  }
  results.appendChild(output);
}
