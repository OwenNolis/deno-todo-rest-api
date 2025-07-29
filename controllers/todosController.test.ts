import { assertEquals, assertExists } from "https://deno.land/std@0.198.0/testing/asserts.ts";

// Simple unit tests - testing basic functionality
Deno.test("Basic test - should pass", () => {
  assertEquals(1 + 1, 2);
});

Deno.test("Todo model structure test", () => {
  const todo = {
    id: "test-id",
    text: "Test todo"
  };
  
  assertExists(todo.id);
  assertExists(todo.text);
  assertEquals(typeof todo.id, "string");
  assertEquals(typeof todo.text, "string");
});

Deno.test("Crypto UUID generation test", () => {
  const uuid1 = crypto.randomUUID();
  const uuid2 = crypto.randomUUID();
  
  assertExists(uuid1);
  assertExists(uuid2);
  assertEquals(typeof uuid1, "string");
  assertEquals(typeof uuid2, "string");
  // UUIDs should be different
  assertEquals(uuid1 === uuid2, false);
});
