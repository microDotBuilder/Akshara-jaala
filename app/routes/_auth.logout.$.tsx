import { redirect } from "@remix-run/node";
import { useAuthStore } from "~/helpers/zustand/auth-button-store";

export async function loader() {
  // is user logged out then redirect to home page.

  return redirect("/");
}
export default function AuthLogoutRoute() {
  return (
    <div className="text-h1 text-center  text-white">
      {" "}
      no one should see this page.
    </div>
  );
}
