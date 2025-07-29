import { assertEquals } from "https://deno.land/std@0.198.0/testing/asserts.ts";

Deno.test("Root level test - GitHub Actions should find this", () => {
  assertEquals(2 + 2, 4);
  assertEquals("deno", "deno");
  assertEquals(true, true);
});

Deno.test("Environment test", () => {
  // Test that we're in a Deno environment
  assertEquals(typeof Deno, "object");
  assertEquals(typeof Deno.version, "object");
});
