import { Context } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { Todo } from "../models/todo.ts";

let todos: Todo[] = [
  { id: "1", text: "Leer Deno" },
  { id: "2", text: "Maak demo project" },
];

export const getTodos = (ctx: Context) => {
  ctx.response.body = { todos };
};

export const addTodo = async (ctx: Context) => {
  const body = await ctx.request.body({ type: "json" }).value;
  const newTodo: Todo = {
    id: crypto.randomUUID(),
    text: body.text,
  };
  todos.push(newTodo);
  ctx.response.status = 201;
  ctx.response.body = { message: "Todo toegevoegd", todo: newTodo };
};