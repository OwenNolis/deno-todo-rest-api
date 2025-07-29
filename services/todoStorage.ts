import { Todo } from "../models/todo.ts";
import { isDeploy } from "../utils/env.ts";

const FILE_PATH = "./todos.json";

export async function loadTodos(): Promise<Todo[]> {
  if (isDeploy()) {
    const kv = await Deno.openKv();
    const res = await kv.get(["todos"]);
    const todos = res.value as Todo[] | null;
    return Array.isArray(todos) ? todos : [];
  } else {
    try {
      const data = await Deno.readTextFile(FILE_PATH);
      return JSON.parse(data) as Todo[];
    } catch {
      return [];
    }
  }
}

export async function saveTodos(todos: Todo[]): Promise<void> {
  if (isDeploy()) {
    const kv = await Deno.openKv();
    await kv.set(["todos"], todos);
  } else {
    await Deno.writeTextFile(FILE_PATH, JSON.stringify(todos, null, 2));
  }
}