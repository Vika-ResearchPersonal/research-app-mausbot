import { Suspense } from "react";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { isLmsEnabled } from "@/lms/flag";

// Defence in depth: src/proxy.ts already answers 404 when the flag is off.
async function Gate({ children }: { children: React.ReactNode }) {
  await connection(); // read the flag per request, not at build time
  if (!isLmsEnabled()) notFound();
  return <>{children}</>;
}

export default function LmsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <Gate>{children}</Gate>
    </Suspense>
  );
}
