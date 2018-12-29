// Remove and complete icons in SVG format
let removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
let completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

// Defining var/arrays for local storage, cheks if there anything in storage
let data = (localStorage.getItem("todoList")) ? JSON.parse(localStorage.getItem("todoList")) : {
  todo: [],
  completed: []
};

// Pulls list of items back from localStorage
function restoreTodoList() {
  if (!data.todo.length && !data.completed.length) return;

  for (var i = 0; i < data.todo.length; i++) {
    let value = data.todo[i];
    addItemToDOM(value);
  }

  for (var j = 0; j < data.completed.length; j++) {
    let value = data.completed[j];
    addItemToDOM(value, true);
  }
}

// Puts updated items to local storage
function dataObjectUpdated() {
  localStorage.setItem("todoList", JSON.stringify(data));
}

// Pulls items back from local storage (do not place it before global variables)
restoreTodoList();

// User clicked on the add (+) button
// if tere is any text in the item field, add this text to the todo list
document.getElementById("add").addEventListener("click", function () {
  const value = document.getElementById("item").value;
  reactions(value)
});

// Binds Enter key to add button
document.getElementById("item").addEventListener("keydown", function (enter) {
  let value = this.value;
  if (enter.code === "Enter" && value) {
    reactions(value);
  }
});

// Creates an item with text inside
function addItem(value) {
  addItemToDOM(value)
  document.getElementById('item').value = '';
  // Pushes item into LocalStoradge
  data.todo.push(value);
  dataObjectUpdated();
}

// Moves item to completed list
function completeItem() {
  let item = this.parentNode.parentNode;
  let parent = item.parentNode;
  let id = parent.id;
  let value = item.innerText;

  // Modify array (toggle todo-completed) and push it back to array
  if (id === "todo") {
    data.todo.splice(data.todo.indexOf(value), 1);
    data.completed.push(value);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
    data.todo.push(value);
  }
  dataObjectUpdated();

  // Checks if the item should be added to the completed list or re-added to the todo list
  let target = (id === "todo") ? document.getElementById("completed") : document.getElementById("todo");

  parent.removeChild(item);
  target.appendChild(item);
  // Use this one instead target.appendChild(item) for adding new items on the top of the list
  // target.insertBefore(item, target.childNodes[0]);
}

// Adds a new item to the todo list
function addItemToDOM(text, completed) {
  let list = (completed) ? document.getElementById("completed") : document.getElementById("todo");

  let item = document.createElement("li");
  item.innerText = text;

  let buttons = document.createElement("div");
  buttons.classList.add("buttons");

  let remove = document.createElement("button");
  remove.classList.add("remove");
  remove.innerHTML = removeSVG;

  // Adds click event for removing the item
  remove.addEventListener("click", removeItem);

  let complete = document.createElement("button");
  complete.classList.add("complete");
  complete.innerHTML = completeSVG;

  // Adds click event for completing the item
  complete.addEventListener("click", completeItem);

  buttons.appendChild(remove);
  buttons.appendChild(complete);
  item.appendChild(buttons);

  list.appendChild(item);
  // Use this one instead list.appendChild(item) for adding new items on the top of the list
  // list.insertBefore(item, list.childNodes[0]);

}

// Removes item from todo list
function removeItem() {
  let item = this.parentNode.parentNode;
  let parent = item.parentNode;
  let id = parent.id;
  let value = item.innerText;
  // Removes items from array as well
  if (id === "todo") {
    data.todo.splice(data.todo.indexOf(value), 1);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
  }

  //Update data in array
  dataObjectUpdated();
  parent.removeChild(item);
}

function reactions(value) {
  if (value) {
    addItem(value);
    // Removes text from item field right after adding it
    document.getElementById("item").value = "";
    // Reactions to different input, I used Regex to reduce complexity, can be replaced with indexOf like this: 
    // if ((value.indexOf('first') >= 0) || (value.indexOf('second') >= 0)) {} indexOf process data faster and ignores string case
    // I also didn't use "else if" to make each conditional equal to each other (has nothing to do with communism) 
  }
  if (value == "") {
    alert("Please write something.");
  } if (value.match(/(Cat|cat)/)) {
    alert("Cats are awesome =(^_^)=");
  } if (value.match(/(Dog|dog)/)) {
    alert("Dogs are cool! ₍ᐢ•ﻌ•ᐢ₎");
  } if (value.match(/(Hello|hello)/)) {
    alert("Hi there! :-)");
  } if (value.match(/(Car|car|Bike|bike|Moped|moped)/)) {
    alert("Drive safe! :-)");
  } if (value.match(/(Buy|buy|Shop|shop)/)) {
    alert("Did you forget to buy anything else? Soft drinks, maybe some milk. :-)");
  } if (value.match(/(Milk|milk)/)) {
    alert("The Korova Milkbar was a milk-plus mesto, and you may, O my brothers, have forgotten what these mestos were like, things changing so skorry these days, and everybody very quick to forget, newspapers not being read much neither. (c) Anthony Burgess, A Clockwork Orange");
  } if (value.match(/(God|god|Jesus|jesus|Jehovah|jehovah|Allah|allah)/)) {
    alert("You shall not take the name of the Lord your God in vain. :-)");
  } if (value.match(/(Book|book|Easter Egg|easter egg)/)) {
    alert("Speaking of books, I personally suggest you \"Ready Player One\" by Ernest Cline for reading, just awesome! :-)");
  } if (value.match(/(Parrot|parrot|Pinin|pinin)/)) {
    alert("He's not pinin'! He's passed on! This parrot is no more! He has ceased to be! He's expired and gone to meet 'is maker! He's a stiff! Bereft of life, he rests in peace! If you hadn't nailed 'im to the perch he'd be pushing up the daisies! His metabolic processes are now history! He's off the twig! He's kicked the bucket, he's shuffled off his mortal coil, run down the curtain and joined the bleedin' choir invisible!! \n THIS IS AN EX-PARROT!! \n (c) Monty Python");
  } if (value.match(/(Banana|banana)/)) {
    alert("It's quite simple to defend yourself against a man armed with a banana. First of all you force him to drop the banana. Then, second, you eat the banana, thus disarming him. You have now rendered him helpless. \n (c) Monty Python");
  } if (value.match(/(Horse|horse)/)) {
    alert("Look at my HORSE, my horse is amazing!!");
  } if (value.match(/(Smokes|smokes|Cigar|cigar)/)) {
    alert("None of my business, but smoking kinda kills or something.");
  } if (value.match(/(Tea|tea)/)) {
    alert("-The entire British empire was built on cups of tea. \n-Yeah, and look what happened to that. \n-And if you think I'm going to war without one, mate, you’re mistaken. \n (с) lock stock and two smoking barrels");
  } if (value.match(/(Suicide|suicide)/)) {
    alert("Suicide, really? Look, you don't need to do this, better take a deep breath, contact me goo.gl/qgp4ei or your best friend and we will talk this out, OK? (or proceed to this page goo.gl/2HQbD6) I mean it, you are not alone, pal.");
  } if (value.match(/(Delete|delete)/)) {
    alert("The power to destroy a thing is the absolute control over it. \n (c) Frank Herbert.");
  } if (value.match(/(Magic|magic)/)) {
    alert("It's not magic. It's talent and sweat. \n (c) Bertram Gilfoyle.");
  } if (value.match(/(Madness|madness)/)) {
    alert("This Is Madness. \n THIS \n IS \n SPARTA!!1 \n (c) Leonidas l.");
  } if (value.match(/(Base|base)/)) {
    alert("ALL YOUR BASE ARE BELONG TO US \n (c) Zero-wing.");
  }
}
