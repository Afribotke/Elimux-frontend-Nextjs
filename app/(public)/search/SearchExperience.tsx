"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function SearchExperience({ initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Searching for:", query);
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          placeholder="Search programs, institutions, or locations..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </form>

      <p className="text-sm text-muted-foreground">
        ElimuX helps students discover programs across Kenya and Africa.
      </p>
    </div>
  );
}

export default SearchExperience;
