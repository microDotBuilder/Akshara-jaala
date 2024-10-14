import { SignIn } from "@clerk/remix";

export default function AuthLoginRoute() {
  return (
    <div className="text-h1 text-center  text-white flex justify-center items-center h-screen">
      <SignIn />
    </div>
  );
}
