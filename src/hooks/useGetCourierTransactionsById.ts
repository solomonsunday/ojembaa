import { httpGetCourierTransactionsById } from "@/services/requests";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useGetCourierTransactionsById = () => {
  const [courierTransactions, setCourierTransactions] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchCourierTransactionsById = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const data = await httpGetCourierTransactionsById(id);
      if (data) {
        setCourierTransactions(data?.data.data);
      }
    } catch (error) {
      let errorMessage: string = "";
      if (error instanceof AxiosError) {
        errorMessage = error?.response?.data?.message;
      }
      toast.error(errorMessage);
      //@ts-ignore
      //   setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { fetchCourierTransactionsById, courierTransactions, isLoading };
};
