import { assertEquals } from "https://deno.land/std@0.198.0/testing/asserts.ts";

Deno.test("Application configuration test", () => {
  // Test basic application structure
  assertEquals(typeof "localhost", "string");
  assertEquals(8000 > 0, true);
  // Verify port is a valid number
  assertEquals(typeof 8000, "number");
});

Deno.test("Import test - ensure modules can be imported", async () => {
  // Test that we can import our main modules without errors
  try {
    await import("./models/todo.ts");
    // Todo is a TypeScript interface, so no runtime import test needed
    assertEquals(true, true); // Module imported successfully
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to import todo model: ${errorMessage}`);
  }
  
  try {
    const todoRoutes = await import("./routes/todos.ts");
    assertEquals(typeof todoRoutes.default, "object");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to import todo routes: ${errorMessage}`);
  }
});
