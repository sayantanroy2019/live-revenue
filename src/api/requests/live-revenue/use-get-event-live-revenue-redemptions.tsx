import { Axios } from '@/src/api/axios-config';
import { useQuery } from '@tanstack/react-query';

const GetEventLiveRevenueRedemptions = async ({ eventId }: { eventId: string }) => {
  try {
    if (!eventId) return;
    const response = await Axios.get(`/liverevenue/${eventId}/redemptions`);
    return response.data; // successful response
  } catch (error: any) {
    // console.log(error);
    if (error.response) {
      throw new Error(error.response.data?.error || 'Server responded with an error');
    } else if (error.request) {
      throw new Error('Network error. Please check your connection.');
    } else {
      throw new Error(error.message || 'Unexpected error');
    }
  }
};

export const useGetEventLiveRevenueRedemptions = ({ eventId }: { eventId: string }) => {
  return useQuery({
    queryKey: ['get-event-live-revenue-redemptions', { eventId }],
    queryFn: () => GetEventLiveRevenueRedemptions({ eventId }),
    enabled: !!eventId,
    retry: 2,
  });
};
