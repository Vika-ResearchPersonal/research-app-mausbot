import test from "node:test";
import assert from "node:assert/strict";
import { ESLint } from "eslint";
import { isLmsEnabled, isLmsPath } from "../src/lms/flag.ts";

test("flag defaults to off", () => {
  assert.equal(isLmsEnabled({}), false);
  assert.equal(isLmsEnabled({ LMS_ENABLED: "false" }), false);
  assert.equal(isLmsEnabled({ LMS_ENABLED: "true" }), true);
});

test("LMS paths are recognised", () => {
  for (const p of ["/learn", "/learn/my", "/teach/courses/1", "/admin/lms", "/api/lms/items/1", "/api/webhooks/payments"]) {
    assert.equal(isLmsPath(p), true, p);
  }
  for (const p of ["/", "/learning", "/admin", "/api/other"]) assert.equal(isLmsPath(p), false, p);
});

test("lint fails a service-role import outside src/lms and src/app/api", async () => {
  const eslint = new ESLint();
  const code = 'import { createServiceRoleClient } from "@/lms/service-role";\nexport const c = createServiceRoleClient;\n';
  const bad = await eslint.lintText(code, { filePath: "src/app/page.tsx" });
  assert.ok(bad[0].messages.some((m) => m.ruleId === "no-restricted-imports"));
  const ok = await eslint.lintText(code, { filePath: "src/lms/domain.ts" });
  assert.ok(!ok[0].messages.some((m) => m.ruleId === "no-restricted-imports"));
});
