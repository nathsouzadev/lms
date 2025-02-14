"use client";

import { Login } from "@/components/login";

console.log("Hello from the client!");

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Classplay</h1>
      <p className="mb-16">This is a MVP to Classplay</p>
      <div className="flex items-center justify-center bg-white dark:bg-stone-950">
        <Login />
      </div>
      {/* <div className="space-x-4">
        <Link href="/customize">
          <Button>Customize Header</Button>
        </Link>
        <Link href="/dashboard">
          <Button>User Management Dashboard</Button>
        </Link>
        <Link href="/courses">
          <Button>Learning Paths</Button>
        </Link>
        <Link href="/login">
          <Button variant="outline">Login</Button>
        </Link>
      </div> */}
    </div>
  );
}
