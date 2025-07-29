import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { getTodos, addTodo, deleteTodo, updateTodo } from "../controllers/todosController.ts";

const router = new Router();

router
  .get("/todos", getTodos)
  .post("/todos", addTodo)
  .delete("/todos/:id", deleteTodo)
  .put("/todos/:id", updateTodo);

export default router;