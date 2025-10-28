'use client';

import { formatToIndianCurrency } from '@/src/utils/helper';

import { ITopupsCardData } from '@/src/types/live-revenue-types';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ViewAllTopupsModal } from './view-all-topups-modal';

// NAME:
// NO OF MACHINES:
// TOTAL ORDERS -> i clicked -> list of orders
// TOTAL SALE

interface DataProps {
  name: string;
  total_sales: number;
  topup_amount: number;
}

const d: DataProps[] = [
  {
    name: 'Shivam',

    topup_amount: 50,
    total_sales: 1655,
  },
  {
    name: 'Shivam',

    topup_amount: 50,
    total_sales: 1655,
  },
  {
    name: 'Shivam',

    topup_amount: 50,
    total_sales: 1655,
  },
  {
    name: 'Shivam',

    topup_amount: 50,
    total_sales: 1655,
  },
  {
    name: 'Shivam',

    topup_amount: 50,
    total_sales: 1655,
  },
  {
    name: 'Shivam',
    topup_amount: 50,
    total_sales: 1655,
  },
  {
    name: 'Shivam',
    topup_amount: 50,
    total_sales: 1655,
  },
];

export default function TopUpCardComponent({ data }: { data: ITopupsCardData | undefined }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const openViewAllTopupsModal = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('open', 'topups');
    router.replace(`?${newSearchParams.toString()}`);
  };

  return (
    <>
      {/* Main Card */}
      <Card className="dark:bg-[#1F1F1F] h-[230px] gap-y-1 xl:min-w-[49%] 2xl:min-w-[49%] lg:min-w-full md:min-w-full sm:min-w-full max-sm:min-w-full overflow-hidden flex flex-col justify-center text-white rounded-2xl shadow-2xl px-0 py-5 border-none">
        <CardHeader className="flex flex-row items-start justify-between">
          {/* Left: Icon + Title */}
          <div className="flex items-center gap-3">
            <Image
              src={'/icons/live-revenue/card-issued-icon.png'}
              alt="card-issued-icon"
              height={60}
              width={60}
            />

            <div>
              <CardTitle className="text-2xl font-bold text-white">
                ₹ {formatToIndianCurrency(data?.balance || 0)}
              </CardTitle>
              <p className="text-gray-400 text-sm">Top Ups ( {data?.no_of_topups || 0} )</p>
            </div>
          </div>

          {/* Right: Buttons */}
          <div className="flex flex-col gap-y-2 items-end">
            <button
              onClick={openViewAllTopupsModal}
              className="text-[#3B82F6] text-xs cursor-pointer dark:bg-[#0a0a0a] px-3 py-1 rounded-full"
            >
              View All
            </button>
            <ViewAllTopupsModal balance={data?.balance} />
            {/* <button className="self-center cursor-pointer dark:bg-[#0a0a0a] p-2 rounded-full">
              <RefreshCw size={15} />
            </button> */}
          </div>
        </CardHeader>

        {/* Bottom Section */}
        <CardContent className="space-y-2 text-sm px-0 text-gray-300">
          <div className="w-full flex flex-row items-center justify-between px-5 py-2 dark:bg-black mt-2">
            <div className="flex flex-row items-center gap-x-2">
              <span>Card Fees:</span>
              <span className="font-medium text-white">
                ₹ {formatToIndianCurrency(data?.card_fees || 0)}
              </span>
            </div>
            <div className="flex gap-x-2">
              <span>Balance:</span>
              <span className="font-medium text-white">
                ₹ {formatToIndianCurrency(data?.balance || 0)}
              </span>
            </div>
          </div>

          <div className="px-5 flex flex-col gap-y-2">
            <div className="flex justify-between">
              <span>UPI Payment</span>
              <span className="font-medium text-white">
                ₹ {data?.total_upi_payment_amount || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Cash Payment</span>
              <span className="font-medium text-white">
                ₹ {data?.total_cash_payment_amount || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Card Payment</span>
              <span className="font-medium text-white">
                ₹ {data?.total_card_payment_amount || 0}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
