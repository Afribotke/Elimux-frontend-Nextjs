import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HeroSearch from "@/app/(public)/HeroSearch";

export default function PublicPage() {
  return (
    <div className="space-y-6">
      <HeroSearch />

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold">Welcome to ElimuX</h2>
          <p className="text-muted-foreground">
            Discover programs, institutions, and opportunities across Africa.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
