const inputField = document.querySelector("input");
const addButton = document.querySelector("button");
const taskList = document.querySelector("ul");

addButton.addEventListener("click", () => {
  const taskText = inputField.value.trim();

  if (taskText === "") {
    return;
  }

  const listItem = document.createElement("li");
  listItem.textContent = taskText;

  const removeButton = document.createElement("button");
  removeButton.textContent = "x";
  removeButton.classList.add("remove");
  listItem.appendChild(removeButton);

  taskList.appendChild(listItem);

  listItem.addEventListener("click", () => {
    if (!listItem.classList.contains("concluida")) {
      listItem.classList.add("concluida");
      const sign = document.createElement("span");
      sign.textContent = "✓";
      sign.classList.add("done-sign");
      listItem.appendChild(sign);
    } else {
      const doneSign = listItem.querySelector(".done-sign");
      if (doneSign) {
        listItem.removeChild(doneSign);
      }
      listItem.classList.remove("concluida");
    }
    saveTasks();
  });

  removeButton.addEventListener("click", (event) => {
    event.stopPropagation();
    taskList.removeChild(listItem);
    saveTasks();
  });

  inputField.value = "";
  saveTasks();
});

function saveTasks() {
  const tasks = [];
  const listItems = taskList.querySelectorAll("li");

  listItems.forEach((item) => {
    tasks.push({
      text: item.childNodes[0].textContent.trim(),
      completed: item.classList.contains("concluida"),
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.textContent = task.text;

    if (task.completed) {
      listItem.classList.add("concluida");
      const sign = document.createElement("span");
      sign.textContent = "✓";
      sign.classList.add("done-sign");
      listItem.appendChild(sign);
    }

    const removeButton = document.createElement("button");
    removeButton.textContent = "x";
    removeButton.classList.add("remove");
    listItem.appendChild(removeButton);

    taskList.appendChild(listItem);

    listItem.addEventListener("click", () => {
      if (!listItem.classList.contains("concluida")) {
        listItem.classList.add("concluida");
        const sign = document.createElement("span");
        sign.textContent = "✓";
        sign.classList.add("done-sign");
        listItem.appendChild(sign);
      } else {
        const doneSign = listItem.querySelector(".done-sign");
        if (doneSign) {
          listItem.removeChild(doneSign);
        }
        listItem.classList.remove("concluida");
      }
      saveTasks();
    });

    removeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      taskList.removeChild(listItem);
      saveTasks();
    });
  });
}

loadTasks();
