import { LoaderFunctionArgs } from "@remix-run/node";

export async function action({ request }: LoaderFunctionArgs) {}
export async function loader({ request }: LoaderFunctionArgs) {}

export default function LoginPage() {
  return (
    <div className="flex min-h-full flex-col justify-center pb-32 pt-20">
      <div className="mx-auto w-full max-w-md">
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-h1">Welcome back!</h1>
          <p className="text-body-md text-muted-foreground">
            Please enter your details.
          </p>
        </div>
      </div>
    </div>
  );
}
