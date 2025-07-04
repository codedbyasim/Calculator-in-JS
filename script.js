const input = document.getElementById("inputBox");
const buttons = document.querySelectorAll(".button");
const toggleMode = document.getElementById("toggleMode");
const historyList = document.getElementById("historyList");

let expression = "";

function updateInput() {
  input.value = expression || "0";
}

buttons.forEach(button => {
  button.addEventListener("click", (e) => {
    const value = e.target.innerHTML;

    switch (value) {
      case "=":
        try {
          const result = eval(expression).toString();
          historyList.innerHTML += `<li>${expression} = ${result}</li>`;
          expression = result;
        } catch {
          expression = "Error";
        }
        break;
      case "AC":
        expression = "";
        break;
      case "DEL":
        expression = expression.slice(0, -1);
        break;
      default:
        expression += value;
    }

    updateInput();
  });
});

document.addEventListener("keydown", (e) => {
  if ("0123456789.+-*/%".includes(e.key)) {
    expression += e.key;
  } else if (e.key === "Enter") {
    try {
      const result = eval(expression).toString();
      historyList.innerHTML += `<li>${expression} = ${result}</li>`;
      expression = result;
    } catch {
      expression = "Error";
    }
  } else if (e.key === "Backspace") {
    expression = expression.slice(0, -1);
  } else if (e.key === "Escape") {
    expression = "";
  }
  updateInput();
});

toggleMode.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
  toggleMode.innerText = document.body.classList.contains("light") ? "🌞" : "🌙";
});

window.onload = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
    toggleMode.innerText = "🌞";
  }
  updateInput();
};
