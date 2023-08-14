import { Button } from "@/components/ui/button";

export function Component() {
  return (
    <div className="container mx-auto">
      <div className="flex items-center space-x-4">
        <div>Button</div>
        <div>
          <Button variant="destructive" size="lg">
            Click Me
          </Button>
        </div>
      </div>
    </div>
  );
}
