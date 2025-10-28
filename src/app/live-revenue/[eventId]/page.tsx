'use client';

import { Loader, RefreshCw } from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useGetEventLiveRevenue } from '@/src/api/requests/live-revenue/use-get-event-live-revenue';
import { IEventTransactionResponse } from '@/src/types/live-revenue-types';

import { FilterData } from '@/src/components/live-revenue/filter-data';
import { LeftOverCard } from '@/src/components/live-revenue/left-over-card';
import { OnSiteRefundsCardComponent } from '@/src/components/live-revenue/onsite-refund-card';
import RedemptionsCardComponent from '@/src/components/live-revenue/redemptions-card';
import { TotalOnlineRefundCardComponent } from '@/src/components/live-revenue/total-online-refund-card';
import { WipeCardComponent } from '@/src/components/live-revenue/wipe-card';

import TopUpCardComponent from '@/src/components/live-revenue/top-up-card';
import { Alert, AlertDescription } from '@/src/components/ui/alert';

function LiveRevenuePage() {
  const { eventId } = useParams();
  const searchParams = useSearchParams();

  const [revenue, setRevenue] = useState<IEventTransactionResponse>();
  const [startDateISO, setStartDateISO] = useState<string | undefined>();
  const [endDateISO, setEndDateISO] = useState<string | undefined>();

  // 🔹 Helper: convert "25+Oct+2025" → ISO string

  // 🔹 Sync startDate & endDate with URL params
  useEffect(() => {
    const start = searchParams.get('startDate');
    const end = searchParams.get('endDate');
    if (start) setStartDateISO(start);
    if (end) setEndDateISO(end);
  }, [searchParams]);

  // 🔹 Fetch live revenue data
  const { data, refetch, isLoading, isError, error, isRefetching } = useGetEventLiveRevenue({
    eventId: eventId as string,
    startDate: startDateISO,
    endDate: endDateISO,
  });

  // 🔹 Update local state when data changes
  useEffect(() => {
    if (data) setRevenue(data);
  }, [data]);

  return (
    <div className="w-full flex flex-col font-rubik">
      <div
        className={`w-full min-h-[calc(100dvh-100px)] 
          2xl:px-[50px] xl:px-[50px] lg:px-[50px] 
          md:p-5 sm:p-5 max-sm:p-5 bg-[#171717] 
          rounded-xl`}
      >
        {/* 🔸 Error State */}
        {isError && (
          <Alert className="bg-red-700 text-white border-none">
            <AlertDescription>Error: {error?.message}</AlertDescription>
          </Alert>
        )}

        {/* 🔹 Header */}
        <div className="w-full sticky top-0 bg-[#171717]/75 flex flex-wrap gap-x-2 justify-between gap-y-3 items-center sm:text-start max-sm:text-start md:text-center lg:text-start xl:text-start 2xl:text-start text-white py-5 font-semibold text-2xl">
          <p className="2xl:flex-1 xl:flex-1 lg:flex-1 md:flex-1 sm:w-full max-sm:w-full truncate">
            {revenue?.event?.name || 'Live Revenue'}
          </p>

          <button
            title="Refresh Data"
            onClick={() => refetch()}
            className="text-blue-700 flex flex-row gap-x-2 text-xs cursor-pointer bg-[#0a0a0a] px-3 py-2 rounded-full"
          >
            {isLoading || isRefetching ? (
              <Loader size={15} className="animate-spin" />
            ) : (
              <span className="flex flex-row items-center gap-x-1">
                <RefreshCw size={15} />
              </span>
            )}
          </button>
        </div>
        {(startDateISO || endDateISO) && (
          <div className="w-fit px-4 py-1.5 bg-black mb-2 rounded-xl text-xs">
            showing data for ({' '}
            {startDateISO &&
              new Date(startDateISO).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}{' '}
            -{' '}
            {endDateISO &&
              new Date(endDateISO).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            )
          </div>
        )}
        {/* 🔹 Date Filter */}
        {revenue?.event?.startDate && revenue?.event?.endDate && <FilterData />}

        {/* 🔹 Revenue Cards */}
        <div className="w-full h-full flex flex-row gap-y-5 gap-x-5 flex-wrap xl:justify-between 2xl:justify-between lg:justify-between md:justify-center sm:justify-center max-sm:justify-center">
          <TopUpCardComponent data={revenue?.transactions?.topups} />
          <RedemptionsCardComponent data={revenue?.transactions?.redemptions} />
          <LeftOverCard amount={revenue?.transactions?.left_over_amount} />
          <OnSiteRefundsCardComponent data={revenue?.transactions?.onsite_refunds} />
          <WipeCardComponent data={revenue?.transactions?.wipe_card} />
          <TotalOnlineRefundCardComponent
            amount={revenue?.transactions?.total_online_refund_amount}
          />
        </div>
      </div>
    </div>
  );
}

export default LiveRevenuePage;
