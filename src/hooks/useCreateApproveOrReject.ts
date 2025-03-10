import { IApproveTxn } from "@/common/interfaces";
import { httpPatchApproveOrRejectPayment } from "@/services/requests";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useApproveOrReject = () => {
  const [status, setStatus] = useState<IApproveTxn>();
  const [loading, setLoading] = useState(false);

  const createApprovePayment = useCallback(
    async (courierId: string, data: IApproveTxn) => {
      try {
        setLoading(true);
        const response = await httpPatchApproveOrRejectPayment(courierId, data);
        setStatus(response.data);
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
    },
    []
  );

  return { createApprovePayment, status, loading, setLoading };
};
