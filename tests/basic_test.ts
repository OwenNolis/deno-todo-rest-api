import { assertEquals } from "https://deno.land/std@0.198.0/testing/asserts.ts";

Deno.test("Tests directory - basic test", () => {
  assertEquals(2 + 2, 4);
});

Deno.test("Tests directory - string test", () => {
  assertEquals("hello", "hello");
});

Deno.test("Tests directory - environment test", () => {
  // Verify we're running in Deno
  assertEquals(typeof Deno !== "undefined", true);
});
