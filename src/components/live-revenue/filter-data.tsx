'use client';

import { Button } from '@/src/components/ui/button';
import { Calendar } from '@/src/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/src/components/ui/popover';
import { cn } from '@/src/utils/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export const FilterData = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [startDate, setStartDate] = useState<Date | undefined>(
    searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined
  );

  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);

  const updateURLParams = (start?: Date, end?: Date) => {
    const params = new URLSearchParams(searchParams.toString());

    if (start) params.set('startDate', start.toISOString());
    else params.delete('startDate');

    if (end) params.set('endDate', end.toISOString());
    else params.delete('endDate');

    const cleanQuery = decodeURIComponent(params.toString());
    router.replace(`?${cleanQuery}`);
  };

  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDate(date);
    setOpenStart(false);
    updateURLParams(date, endDate);
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    setEndDate(date);
    setOpenEnd(false);
    updateURLParams(startDate, date);
  };

  return (
    <div className="flex flex-col sm:flex-row mb-5 items-stretch sm:items-center gap-4 bg-[#1f1f1f] p-4 rounded-xl w-full">
      {/* Start Date Picker */}
      <div className="flex flex-col flex-1 w-full">
        <label className="text-sm font-medium mb-1 text-white">From Date</label>
        <Popover open={openStart} onOpenChange={setOpenStart}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal text-white bg-[#1f1f1f] border border-stone-700',
                !startDate && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, 'PPP') : 'Pick start date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 bg-[#1f1f1f] shadow-lg rounded-md border border-stone-700">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={handleStartDateSelect}
              autoFocus
              className="calendar-custom"
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* End Date Picker */}
      <div className="flex flex-col flex-1 w-full">
        <label className="text-sm font-medium mb-1 text-white">To Date</label>
        <Popover open={openEnd} onOpenChange={setOpenEnd}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal text-white bg-[#1f1f1f] border border-stone-700',
                !endDate && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate ? format(endDate, 'PPP') : 'Pick end date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-[#1f1f1f] shadow-lg rounded-md border border-stone-700">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={handleEndDateSelect}
              autoFocus
              className=""
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
