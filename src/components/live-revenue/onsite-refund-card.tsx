import { Card, CardContent, CardTitle } from '@/src/components/ui/card';
import Image from 'next/image';

import { formatToIndianCurrency } from '@/lib/helper';
import { IOnSiteRefundData } from '@/src/types/live-revenue-types';

export const OnSiteRefundsCardComponent = ({ data }: { data: IOnSiteRefundData | undefined }) => {
  return (
    <Card className="dark:bg-[#1F1F1F] xl:min-w-[49%] 2xl:min-w-[49%] lg:min-w-full md:min-w-full sm:min-w-full max-sm:min-w-full flex flex-col items-center text-white  shadow-2xl border-none w-full max-w-md">
      {/* <CardHeader className="flex w-full flex-row items-start justify-between pb-2">
      </CardHeader> */}

      <CardContent className="flex w-full flex-row items-start justify-between pb-2">
        <div className="flex items-center gap-3">
          <Image
            src={'/icons/live-revenue/onsite-refund-icon.png'}
            alt="card-isseud-icon"
            height={60}
            width={60}
            // className="h-12 w-12"
          />
          <div>
            <CardTitle className="text-2xl font-bold">
              ₹ {formatToIndianCurrency(data?.total_amount || 0)}
            </CardTitle>
            <p className="text-gray-400 text-sm">
              ONSITE REFUND ( {data?.cards_count || 0}{' '}
              {data?.cards_count && data?.cards_count !== 0 && data?.cards_count > 1
                ? 'CARDS'
                : 'CARD'}{' '}
              )
            </p>
          </div>
        </div>
        {/* <div className="flex flex-col gap-y-2 items-end">
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-[#3B82F6] text-xs cursor-pointer dark:bg-[#0a0a0a] px-3 py-1 rounded-full">
                View All
              </button>
            </DialogTrigger>

            <DialogContent className="dark:bg-[#1F1F1F] border-none text-white max-w-md">
              <DialogHeader>
                <DialogTitle>Issued Cards Details</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Here you can view all the cards that have been issued to users.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-2 text-sm">
                <p>
                  Total Cards: <span className="font-semibold text-white">2,607</span>
                </p>
                <p>Card Fees: ₹ {formatToIndianCurrency(45645)}</p>
                <p>UPI Payments: ₹ 2,650,191</p>
                <p>Cash Payments: ₹ 951,567</p>
                <p>Card Payments: ₹ 951,567</p>
              </div>
            </DialogContent>
          </Dialog>

          {/* <button className="self-center cursor-pointer dark:bg-[#0a0a0a] p-2 rounded-full">
            <RefreshCw size={15} />
          </button> 
        </div> */}
      </CardContent>
    </Card>
  );
};
