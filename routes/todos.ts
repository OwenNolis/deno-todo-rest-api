import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { getTodos, addTodo } from "../controllers/todosController.ts";

const router = new Router();

router
  .get("/todos", getTodos)
  .post("/todos", addTodo);

export default router;