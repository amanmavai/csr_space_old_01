import React from "react";
import { MultiSelect } from "@/components/components";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DefaultOptionType } from "antd/es/select";

export function Component() {
  const [selectedValues , setSelectedValues] = React.useState<DefaultOptionType[]>([]);
  
  return (
    <div className="container mx-auto space-y-8">
      <div className="flex items-center space-x-4">
        <div>Button</div>
        <div>
          <Button variant="destructive" size="lg">
            Click Me
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div>Select</div>
        <div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div>MultiSelect</div>
        <div>
          <MultiSelect
            uniqueItems={[
              { label: "First", value: "first" },
              { label: "Second", value: "second" },
              { label: "Third", value: "third" },
              { label: "Fourth", value: "fourth" },
            ]}
            selectedValues={selectedValues}
            onChange={values => setSelectedValues(values)}
          />
        </div>
      </div>
    </div>
  );
}
