import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

import { formatToIndianCurrency } from '@/lib/helper';
import { IRedemptionsData } from '@/src/types/live-revenue-types';
import { useRouter, useSearchParams } from 'next/navigation';
import { ViewAllRedemptionssModal } from './view-all-redemptions-modal';

export default function RedemptionsCardComponent({ data }: { data: IRedemptionsData | undefined }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const openViewAllRedemptionsModal = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('open', 'redemptions');
    router.replace(`?${newSearchParams.toString()}`);
  };
  return (
    <Card className="dark:bg-[#1F1F1F] xl:min-w-[49%] 2xl:min-w-[49%] lg:min-w-full md:min-w-full sm:min-w-full max-sm:min-w-full flex flex-col text-white rounded-2xl shadow-2xl  h-[230px] px-0 border-none">
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={'/icons/live-revenue/transaction-count-icon.png'}
            alt="card-isseud-icon"
            height={60}
            width={60}
            // className="h-12 w-12"
          />
          <div className="">
            <CardTitle className="text-2xl font-bold text-white">
              ₹ {formatToIndianCurrency(data?.total_redemption_amount || 0)}
            </CardTitle>
            <p className="text-gray-400  text-sm">REDEMPTIONS </p>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 items-end">
          <button
            onClick={openViewAllRedemptionsModal}
            className="text-[#3B82F6] text-xs cursor-pointer dark:bg-[#0a0a0a] px-3 py-1 rounded-full"
          >
            View All
          </button>
          <ViewAllRedemptionssModal balance={data?.total_redemption_amount} />
          {/* <button className="self-center cursor-pointer dark:bg-[#0a0a0a] p-2 rounded-full">
            <RefreshCw size={15} />
          </button> */}
        </div>
      </CardHeader>

      <CardContent className="space-y-2 text-sm px-0 text-gray-300">
        {/* <div className="w-full flex flex-row items-center justify-between p-2 bg-[#0a0a0a]">
          <div className="flex flex-row items-center gap-x-2  justify-between">
            <span>Card Fees:</span>
            <span className="font-medium text-white">₹ 128,400</span>
          </div>
          <div className="flex px-5 gap-x-2 justify-between">
            <span>Balance</span>
            <span className="font-medium text-white">₹ 4,295,460</span>
          </div>
        </div> */}

        <div className="px-5 flex flex-col justify-center items-center gap-y-2">
          <div className="flex flex-col w-full text-center">
            <span className="text-2xl">RFID Sales</span>
            <span className="font-medium text-xl text-white">{data?.total_rfid_sales || 0}</span>
          </div>
          {/* <div className="flex justify-between">
            <span>Cash Payment</span>
            <span className="font-medium text-white">₹ 951,567</span>
          </div>

          <div className="flex justify-between">
            <span>Card Payment</span>
            <span className="font-medium text-white">₹ 951,567</span>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
}
