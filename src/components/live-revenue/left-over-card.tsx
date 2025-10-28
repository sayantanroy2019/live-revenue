// import { formatToIndianCurrency } from '@/src/lib/helper';
import { Card, CardContent, CardTitle } from '@/src/components/ui/card';
import { formatToIndianCurrency } from '@/src/utils/helper';
import Image from 'next/image';

export const LeftOverCard = ({ amount = 0 }: { amount: number | undefined }) => {
  return (
    <Card className="dark:bg-[#1F1F1F] flex flex-row items-center text-white shadow-2xl border-none 2xl:min-w-[49%] xl:min-w-[49%] lg:min-w-full md:min-w-full sm:min-w-full max-sm:min-w-full">
      <CardContent className="space-y-2 gap-x-2 w-full flex flex-row items-center text-sm text-gray-300">
        <Image
          src={'/icons/live-revenue/left-over-icon.png'}
          alt="card-isseud-icon"
          height={60}
          width={60}
          // className="h-12 w-12"
        />
        <div className="flex flex-row items-center gap-x-6 flex-1">
          <div>
            <CardTitle className="text-2xl font-bold">
              ₹ {formatToIndianCurrency(amount || 0)}
            </CardTitle>
            <p className="text-gray-400 text-sm">LEFT OVER (REMAINING)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
