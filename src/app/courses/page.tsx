"use client";

import { Paths } from "@/components/path";
import { useAuth } from "@/hooks/useAuth";

export default function CoursesPage() {
  const { score } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Learning Paths</h1>
      <p className="mb-4">Your current score: {score}</p>
      <Paths />
    </div>
  );
}
