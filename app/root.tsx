import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import { ClerkApp } from "@clerk/remix";

import "./tailwind.css";
import GeometryBackground from "./components/geometry-background";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { AlignJustifyIcon, HeartIcon, User2Icon, UserIcon } from "lucide-react";
import { GeneralErrorBoundary } from "./components/error-boundary";

export const loader: LoaderFunction = (args) => rootAuthLoader(args);

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Function to handle window resize
    const handleResize = () => {
      // Close the menu if the screen width exceeds the lg breakpoint (1024px)
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 overflow-hidden relative">
      <GeometryBackground />
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute top-7 right-7 flex space-x-4 z-10"
      >
        {/* Desktop Buttons */}
        <div className="hidden lg:flex space-x-4">
          <Link to="/signup">
            <Button
              variant="outline"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Sign Up
            </Button>
          </Link>
          <Link to="/login">
            <Button
              variant="outline"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              Log In
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <AlignJustifyIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end">
              <DropdownMenuItem>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-secondary-foreground"
                >
                  <User2Icon className="mr-2" />
                  Sign In
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-secondary-foreground"
                >
                  <UserIcon className="mr-2" />
                  Login
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>

      <div className=" z-20 flex-1">
        <Outlet />
      </div>
      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-12 text-gray-500 text-sm relative z-10"
      >
        © 2024 AKSHARA JAALA. All rights reserved.
        <br />
        <div className="flex justify-center items-center h-full">
          Built with <HeartIcon className="w-4 h-4 mx-1 text-red-500 " />{" "}
          by&nbsp;
          <a href="https://github.com/microDotBuilder" className="underline ">
            MICRODOT BUILDER
          </a>
        </div>
      </motion.footer>
    </div>
  );
}

export function ErrorBoundary() {
  return (
    <Layout>
      <div className="flex-1">
        <GeneralErrorBoundary />
      </div>
    </Layout>
  );
}

export default ClerkApp(App);
