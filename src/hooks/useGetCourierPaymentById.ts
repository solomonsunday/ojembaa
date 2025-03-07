import { IPaymentDetail } from "@/common/interfaces";
import { httpGetCourierPaymentDataById } from "@/services/requests";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useGetCourierPaymentById = () => {
  const [courierPayment, setCourierPayment] = useState<IPaymentDetail>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchCourierPaymentById = useCallback(async (courierId: string) => {
    try {
      setIsLoading(true);
      const data = await httpGetCourierPaymentDataById(courierId);
      if (data) {
        setCourierPayment(data?.data.data);
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

  return { fetchCourierPaymentById, courierPayment, isLoading };
};
