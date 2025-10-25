// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/src/components/ui/collapsible';
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '../ui/button';

export const FilterData = () => {
  return (
    <Collapsible className="bg-[#1f1f1f] py-2 px-5 rounded-xl mb-5">
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="w-full  flex flex-row justify-between text-white"
        >
          <span className="">Filter Data</span>
          <ChevronsUpDown />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="border-t border-dashed border-stone-600 py-2">
        <div
          className="
            flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row
            gap-y-2 gap-x-5 w-full
          "
        >
          {/* Start Date */}
          <div className="flex-1 flex flex-col gap-y-1 min-w-[200px]">
            <p className="text-gray-400 text-xs">Start Date</p>
            <Select>
              <SelectTrigger className="w-full border-stone-600 focus:outline-none focus:ring-0 relative z-20">
                <SelectValue placeholder="Select date" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                side="bottom"
                className="bg-[#1f1f1f]  border border-stone-600 z-9999 text-white rounded-xl shadow-xl"
              >
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* End Date */}
          <div className="flex-1 flex flex-col gap-y-1 min-w-[200px]">
            <p className="text-gray-400 text-xs">End Date</p>
            <Select>
              <SelectTrigger className="w-full border-stone-600 relative z-20">
                <SelectValue placeholder="End date" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                side="bottom"
                className="bg-[#1f1f1f] border border-stone-600 z-9999 text-white rounded-xl shadow-xl"
              >
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>

    // <Card className="bg-[#1f1f1f] text-white border-none flex flex-col gap-y-2 mb-5">
    //   <CardHeader className="m-0">
    //     <CardTitle>Filter</CardTitle>
    //     <CardDescription className="text-gray-600 text-xs">
    //       Choose start and end date of the event to filter the data
    //     </CardDescription>
    //   </CardHeader>

    //   <CardContent className="w-full m-0">
    //     <div
    //       className="
    //         flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row
    //         gap-5 w-full
    //       "
    //     >
    //       {/* Start Date */}
    //       <div className="flex-1 flex flex-col gap-y-1 min-w-[200px]">
    //         <p className="text-gray-600 text-xs">Start Date</p>
    //         <Select>
    //           <SelectTrigger className="w-full border-stone-600 focus:outline-none focus:ring-0 focus:border-none relative z-20">
    //             <SelectValue placeholder="Select date" />
    //           </SelectTrigger>
    //           <SelectContent
    //             position="popper"
    //             side="bottom"
    //             className="bg-[#1f1f1f]  border border-stone-600 z-9999 text-white rounded-xl shadow-xl"
    //           >
    //             <SelectItem value="light">Light</SelectItem>
    //             <SelectItem value="dark">Dark</SelectItem>
    //             <SelectItem value="system">System</SelectItem>
    //           </SelectContent>
    //         </Select>
    //       </div>

    //       {/* End Date */}
    //       <div className="flex-1 flex flex-col gap-y-1 min-w-[200px]">
    //         <p className="text-gray-600 text-xs">End Date</p>
    //         <Select>
    //           <SelectTrigger className="w-full border-stone-600 relative z-20">
    //             <SelectValue placeholder="End date" />
    //           </SelectTrigger>
    //           <SelectContent
    //             position="popper"
    //             side="bottom"
    //             className="bg-[#1f1f1f] border border-stone-600 z-9999 text-white rounded-xl shadow-xl"
    //           >
    //             <SelectItem value="light">Light</SelectItem>
    //             <SelectItem value="dark">Dark</SelectItem>
    //             <SelectItem value="system">System</SelectItem>
    //           </SelectContent>
    //         </Select>
    //       </div>
    //     </div>
    //   </CardContent>
    // </Card>
  );
};
