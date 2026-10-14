import { redirect } from "next/navigation";

/** Manage + upload are now one page. */
export default function ManageProjectsPage() {
  redirect("/projects/upload");
}
