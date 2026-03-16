import { auth } from "@/lib/auth";

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Unauthorized", status: 401 as const, session: null };
  }
  if (session.user.role !== "admin") {
    return { error: "Forbidden", status: 403 as const, session: null };
  }
  return { error: null, status: null, session };
}
