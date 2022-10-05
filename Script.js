// creating an empty arrylist
const toDoList = [];
// catch the input_field
let input = document.getElementById("input");
// the (Add) button
let myBtn = document.getElementById("myBtn");
// creat unorderd_list and set its Attributes
let ul = document.createElement("ul");
ul.setAttribute("id", "mainUl");
// create a fragmant file
let fragmant = document.createDocumentFragment();

const getValueInput = () => {
  // taking the input and add it to the list
  let inputValue = input.value;
  toDoList.push(inputValue);
  input.value = "";
  // showing the item
  let li = document.createElement("li");
  li.setAttribute("class", "item");
  li.textContent = inputValue;
  li.style.cssText = `
    // text-decoration: line-through;
    list-style-type: none;
    `;
  ul.appendChild(li);
};

// click on (Add) button with (Enter) key
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter" && input.value != "") {
    event.preventDefault();
    getValueInput();
  }
});

// show the arraylist items on the screen
let list = document.getElementById("list");
list.appendChild(ul);
