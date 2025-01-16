import { IPageInfo } from "@/common/interfaces";
import { httpGetRecentDelivery } from "@/services/requests";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useGetRecentDelivery = () => {
  const [recentDelivery, setRecentDelivery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState<IPageInfo>();

  const fetchRecentDelivery = useCallback(async (query?: IPageInfo) => {
    try {
      setLoading(true);
      const response = await httpGetRecentDelivery({
        limit: query?.limit,
        page: query?.page,
      });
      setRecentDelivery(response?.data?.data);
      setPageInfo(response?.data?.pageInfo);
    } catch (error) {
      let errorMessage: string = "";
      if (error instanceof AxiosError) {
        errorMessage = error?.response?.data?.message;
      }
      toast.error(errorMessage);
      //@ts-ignore
      //   setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchRecentDelivery, recentDelivery, loading, setLoading, pageInfo };
};
