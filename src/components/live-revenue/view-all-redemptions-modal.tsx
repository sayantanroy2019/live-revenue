import { formatToIndianCurrency } from '@/src/utils/helper';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Loader, LucideDownload } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';

import { useGetEventLiveRevenueRedemptions } from '@/src/api/requests/live-revenue/use-get-event-live-revenue-redemptions';

interface Props {
  name: string;
  machines_count: number;
  total_orders: number;
  total_sale: number;
}

export const ViewAllRedemptionssModal = ({ balance = 0 }: { balance: number | undefined }) => {
  const { eventId } = useParams();
  const [redemptions, setRedemptions] = useState<Props[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  const open = searchParams.get('open') === 'redemptions';

  const closeViewAllTopupsModal = () => {
    router.replace(`?`);
  };

  const { data, isError, error, isLoading, refetch } = useGetEventLiveRevenueRedemptions({
    eventId: eventId as string,
  });

  useEffect(() => {
    if (data) setRedemptions(data);
  }, [data]);

  // ✅ DOWNLOAD HANDLER
  const handleDownload = () => {
    if (!redemptions || redemptions.length === 0) return;

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(redemptions);
    // Create workbook and append sheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Redemptions');

    // Export to file
    XLSX.writeFile(wb, `redemptions_${eventId || 'data'}.xlsx`);
  };

  return (
    <Dialog open={open} onOpenChange={closeViewAllTopupsModal}>
      <DialogContent className="dark:bg-[#1F1F1F] 2xl:min-w-[70%] xl:min-w-[70%] lg:min-w-[70%] md:min-w-[95%] sm:min-w-[95%] max-sm:min-w-[95%] max-h-[90dvh] overflow-y-auto border-none text-white">
        <DialogHeader className="pt-6">
          <VisuallyHidden>
            <DialogTitle></DialogTitle>
            <DialogDescription className="text-gray-400"></DialogDescription>
          </VisuallyHidden>

          <div className="flex items-center gap-3 flex-row justify-between flex-wrap">
            <Image
              src={'/icons/live-revenue/transaction-count-icon.png'}
              alt="card-issued-icon"
              height={60}
              width={60}
            />

            <div className="flex-1">
              <p className="text-2xl font-bold text-white">
                ₹ {formatToIndianCurrency(balance || 0)}
              </p>
              <p className="uppercase">TOTAL Redemptions</p>
            </div>

            {redemptions && redemptions.length > 0 && !isError && !isLoading && (
              <button
                type="button"
                onClick={handleDownload}
                title="Download Excel"
                className="cursor-pointer hover:bg-[#2b2b2b] p-2 rounded-full transition"
              >
                <LucideDownload size={20} />
              </button>
            )}
          </div>
        </DialogHeader>

        <div className="w-full flex flex-row flex-wrap gap-2 justify-center items-center">
          {isLoading ? (
            <div className="w-full flex flex-col justify-center items-center gap-y-1">
              <Loader size={20} color="white" className="animate-spin" />
              <p className="text-center text-sm text-white">Loading redemptions data...</p>
            </div>
          ) : isError ? (
            <div className="w-full flex flex-col justify-center items-center gap-y-1">
              <p className="text-center text-sm text-white">Error: {error?.message}</p>
              <button
                onClick={() => refetch()}
                className="text-center cursor-pointer text-sm bg-[#000000] px-3 py-1.5 rounded-2xl text-white"
              >
                retry
              </button>
            </div>
          ) : redemptions && redemptions.length > 0 ? (
            <>
              {redemptions.map((item, i) => (
                <div
                  key={`view-all-top-ups-modal-${i}`}
                  className="px-5 py-2 rounded-xl bg-black flex flex-col 2xl:w-4/12 xl:w-4/12 lg:w-4/12 md:w-full sm:w-full max-sm:w-full"
                >
                  <p className="flex flex-row items-center justify-between">
                    <span>{item.name}</span>
                  </p>
                  <p className="flex flex-row items-center justify-between">
                    <span>Total Machines</span>
                    <span>{item.machines_count}</span>
                  </p>
                  <p className="flex flex-row items-center justify-between">
                    <span>Total Orders</span>
                    <span>{item.total_orders}</span>
                  </p>
                  <p className="flex flex-row items-center justify-between">
                    <span>Total Sales</span>
                    <span>{formatToIndianCurrency(item.total_sale)}</span>
                  </p>
                </div>
              ))}
            </>
          ) : (
            <p className="text-center text-sm text-white">No redemptions data found.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
