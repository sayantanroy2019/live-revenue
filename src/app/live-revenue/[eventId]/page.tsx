'use client';

import { WipeCardComponent } from '@/src/components/live-revenue/wipe-card';

import { LeftOverCard } from '@/src/components/live-revenue/left-over-card';
import RedemptionsCardComponent from '@/src/components/live-revenue/redemptions-card';
import { TotalOnlineRefundCardComponent } from '@/src/components/live-revenue/total-online-refund-card';

import { useGetEventLiveRevenue } from '@/src/api/requests/live-revenue/use-get-event-live-revenue';
import { OnSiteRefundsCardComponent } from '@/src/components/live-revenue/onsite-refund-card';
import TopUpCardComponent from '@/src/components/live-revenue/top-up-card';
import { LiveRevenue } from '@/src/types/live-revenue-types';
import { Loader, RefreshCw } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { FilterData } from '@/src/components/live-revenue/filter-data';
import { Alert, AlertDescription } from '@/src/components/ui/alert';

function LiveRevenuePage() {
  const { eventId } = useParams();

  const [revenue, setRevenue] = useState<LiveRevenue>();

  // const eventId = 'kumaon-mela-2025-10-24T08-16-19';

  const { data, refetch, isLoading, isError, error, isRefetching } = useGetEventLiveRevenue({
    eventId: eventId as string,
  });

  useEffect(() => {
    if (data) setRevenue(data);
  }, [data]);

  // console.table(data);

  return (
    <div className="w-full flex flex-col font-rubik">
      {/* <p className="text-2xl font-semibold mb-5 font-rubik text-white">Live Revenue</p> */}
      <div
        className={`w-full min-h-[calc(100dvh-100px)] 
          2xl:px-[50px] xl:px-[50px] lg:px-[50px] 
          md:p-5 sm:p-5 max-sm:p-5 bg-[#171717] 
          rounded-xl`}
      >
        {isError && (
          <Alert className="bg-red-700 text-white border-none">
            {/* <Terminal /> */}
            {/* <AlertTitle>Oops! Something went wrong!</AlertTitle> */}
            <AlertDescription>Error: {error?.message}</AlertDescription>
            {/* <AlertDescription>ToDo: Try refreshing the data again.</AlertDescription> */}
          </Alert>
        )}
        <div className="w-full sticky top-0 bg-[#171717]/75 flex flex-wrap gap-x-2 justify-between gap-y-3 items-center sm:text-start max-sm:text-start md:text-center lg:text-start xl:text-start 2xl:text-start text-white py-5 font-semibold text-2xl">
          <p className="2xl:flex-1 xl:flex-1 lg:flex-1 md:flex-1 sm:w-full max-sm:w-full truncate">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, eaque?
          </p>
          <button
            title="refresh data"
            onClick={() => refetch()}
            className="text-blue-700  flex flex-row gap-x-2 text-xs cursor-pointer bg-[#0a0a0a] px-3 py-2 rounded-full"
          >
            {isLoading || isRefetching ? (
              <Loader size={15} className="animate-spin" />
            ) : (
              <span className="flex flex-row items-center gap-x-1">
                <RefreshCw size={15} />
                {/* <span>Refresh Data</span> */}
              </span>
            )}
          </button>
        </div>
        {isLoading && !isRefetching && (
          <div className="w-full mb-3">
            <span className="text-blue-700 text-sm px-3 py-1 bg-black rounded-full">
              Loading data...
            </span>
          </div>
        )}

        {!isLoading && isRefetching && (
          <div className="w-full mb-3">
            <span className="text-blue-700 text-sm px-3 py-1 bg-black rounded-full">
              Refreshing data...
            </span>
          </div>
        )}
        <FilterData />
        <div className="w-full h-full flex flex-row gap-y-5 gap-x-5 flex-wrap xl:justify-between 2xl:justify-between lg:justify-between md:justify-center sm:justify-center max-sm:justify-center">
          <TopUpCardComponent data={revenue?.topups} />
          {/* <div className="h-72 flex flex-col justify-between 2xl:min-w-[49%] xl:min-w-[49%] lg:min-w-[49%] md:min-w-[49%] sm:min-w-full max-sm:min-w-full"> */}
          <RedemptionsCardComponent data={revenue?.redemptions} />
          <LeftOverCard amount={revenue?.left_over_amount} />
          {/* </div> */}
          <OnSiteRefundsCardComponent data={revenue?.onsite_refunds} />
          <WipeCardComponent data={revenue?.wipe_card} />
          <TotalOnlineRefundCardComponent amount={revenue?.total_online_refund_amount} />

          {/* <TopSellingProducts />
          <TopSellingCategories /> */}
        </div>
      </div>
    </div>
  );
}

export default LiveRevenuePage;
