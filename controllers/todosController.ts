import { Context, RouterContext } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { Todo } from "../models/todo.ts";

const FILE_PATH = "./todos.json";

let todos: Todo[] = [];

// 🟡 Hulpfuncties
async function loadTodos() {
  try {
    const data = await Deno.readTextFile(FILE_PATH);
    todos = JSON.parse(data);
  } catch {
    todos = [];
  }
}

async function saveTodos() {
  await Deno.writeTextFile(FILE_PATH, JSON.stringify(todos, null, 2));
}

// 🟢 GET
export const getTodos = async (ctx: Context) => {
  await loadTodos();
  ctx.response.body = { todos };
};

// 🟢 POST
export const addTodo = async (ctx: Context) => {
  const body = await ctx.request.body({ type: "json" }).value;
  const newTodo: Todo = {
    id: crypto.randomUUID(),
    text: body.text,
  };

  await loadTodos();
  todos.push(newTodo);
  await saveTodos();

  ctx.response.status = 201;
  ctx.response.body = { message: "Todo toegevoegd", todo: newTodo };
};

// 🔴 DELETE
export const deleteTodo = async (ctx: RouterContext<"/todos/:id">) => {
  const id = ctx.params.id;
  await loadTodos();

  todos = todos.filter((todo) => todo.id !== id);
  await saveTodos();

  ctx.response.body = { message: `Todo met id ${id} verwijderd` };
};

// ✏️ PUT (Update)
export const updateTodo = async (ctx: RouterContext<"/todos/:id">) => {
  const id = ctx.params.id;
  const body = await ctx.request.body({ type: "json" }).value;

  await loadTodos();

  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    ctx.response.status = 404;
    ctx.response.body = { message: "Todo niet gevonden" };
    return;
  }

  todos[index].text = body.text;
  await saveTodos();

  ctx.response.body = { message: "Todo bijgewerkt", todo: todos[index] };
};