import { SignUp } from "@clerk/remix";

export default function AuthSignupRoute() {
  return (
    <div className="text-h1 text-center  text-white">
      <SignUp />
    </div>
  );
}
