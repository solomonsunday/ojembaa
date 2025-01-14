import { IAppUsers, IPageInfo } from "@/common/interfaces";
import { httpGetUsers } from "@/services/requests";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useGetUsers = () => {
  const [users, setUsers] = useState<IAppUsers[]>([]);
  const [pageInfo, setPageInfo] = useState<IPageInfo>();
  const [loading, setLoading] = useState(true);

  const fetchAllUsers = useCallback(async (query: IPageInfo) => {
    try {
      setLoading(true);
      const res = await httpGetUsers({ limit: query.limit, page: query.page });
      if (res) {
        setUsers(res.data?.data);
        setPageInfo(res.data.pageInfo);
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
      setLoading(false);
    }
  }, []);

  // useEffect(() => {
  //   fetchAllUsers({ limit: 10 });
  // }, [fetchAllUsers]);

  return { fetchAllUsers, users, loading, setLoading, pageInfo };
};
