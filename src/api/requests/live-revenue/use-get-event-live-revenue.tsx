import { Axios } from '@/src/api/axios-config';
import { useQuery } from '@tanstack/react-query';

const GetEventLiveRevenue = async ({ eventId }: { eventId: string }) => {
  try {
    if (!eventId) return;
    const response = await Axios.get(`/liverevenue/${eventId}`);
    console.log(response.data);
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

export const useGetEventLiveRevenue = ({ eventId }: { eventId: string }) => {
  return useQuery({
    queryKey: ['get-event-live-revenue', { eventId }],
    queryFn: () => GetEventLiveRevenue({ eventId }),
    enabled: !!eventId,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
