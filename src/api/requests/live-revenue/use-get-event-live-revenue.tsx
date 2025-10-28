import { Axios } from '@/src/api/axios-config';
import { useQuery } from '@tanstack/react-query';

// 🔹 Fetch Function
const GetEventLiveRevenue = async ({
  eventId,
  startDate,
  endDate,
}: {
  eventId: string;
  startDate?: string;
  endDate?: string;
}) => {
  try {
    if (!eventId) return;

    // If startDate exists but endDate doesn’t, default both to same date
    if (startDate && !endDate) endDate = startDate;

    // ✅ Build raw query string manually — no encoding
    let url = `/liverevenue/${eventId}`;
    if (startDate && endDate) {
      url += `?startDate=${startDate}&endDate=${endDate}`;
    } else if (startDate) {
      url += `?startDate=${startDate}`;
    }

    console.log('📡 Fetching:', url);

    const response = await Axios.get(url);
    console.log(`✅ Response for ${eventId}:`, response.data);

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.error || 'Server responded with an error');
    } else if (error.request) {
      throw new Error('Network error. Please check your connection.');
    } else {
      throw new Error(error.message || 'Unexpected error');
    }
  }
};

// 🔹 React Query Hook
export const useGetEventLiveRevenue = ({
  eventId,
  startDate,
  endDate,
}: {
  eventId: string;
  startDate?: string;
  endDate?: string;
}) => {
  return useQuery({
    queryKey: ['get-event-live-revenue', { eventId, startDate, endDate }],
    queryFn: () => GetEventLiveRevenue({ eventId, startDate, endDate }),
    enabled: !!eventId,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
