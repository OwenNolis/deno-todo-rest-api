async function fetchTodos() {
  const res = await fetch("/todos");
  const data = await res.json();
  const list = document.getElementById("todo-list");
  list.innerHTML = "";

  data.todos.forEach(todo => {
    const li = document.createElement("li");

    // Todo tekst
    const span = document.createElement("span");
    span.textContent = todo.text;
    span.style.marginRight = "10px";

    // ✏️ Bewerk knop
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.onclick = () => editTodo(todo.id, todo.text);

    // 🗑️ Verwijder knop
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.onclick = () => deleteTodo(todo.id);

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

async function addTodo() {
  const input = document.getElementById("newTodo");
  const text = input.value;
  if (!text) return;

  await fetch("/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  input.value = "";
  fetchTodos();
}

async function deleteTodo(id) {
  await fetch(`/todos/${id}`, { method: "DELETE" });
  fetchTodos();
}

async function editTodo(id, oldText) {
  const newText = prompt("Nieuwe tekst voor deze taak:", oldText);
  if (newText === null || newText.trim() === "") return;

  await fetch(`/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: newText })
  });

  fetchTodos();
}

fetchTodos();