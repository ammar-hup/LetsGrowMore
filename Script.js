const toDoList = [];
let inputValue = document.getElementById("input").value;
let mybtn = document.getElementById("myBtn");

const getValueInput = () => {
  toDoList.push(inputValue);
  document.getElementById("input").value = "";
};
inputValue.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    myBtn.click();
  }
});
