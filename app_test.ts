import { assertEquals } from "https://deno.land/std@0.198.0/testing/asserts.ts";

Deno.test("explicit test file discovery", () => {
  assertEquals(1, 1);
});

Deno.test("GitHub Actions test discovery", () => {
  assertEquals("test", "test");
});

Deno.test("CI/CD pipeline verification", () => {
  assertEquals(true, true);
});
