"use client";
import { IAppUsers } from "./interfaces";

export interface IFilteringUser {
  setFilteredUser: (val: IAppUsers) => void;
  setSelectedValue: (val: string) => string;
}

const useSortList = (
  setFilteredUser: any,
  setSelectedValue: any,
  users: IAppUsers[]
) => {
  const handleSelectChange = (event: any) => {
    const value = event.target.value;
    setSelectedValue(value);
    sortUserList(value);
  };

  const sortUserList = (value: string) => {
    let sortedUser;
    if (value === "all") {
      sortedUser = users;
      return setFilteredUser(sortedUser);
    }
    let result = users.filter((item) => item.role === value);
    setFilteredUser(result);
  };
  return { handleSelectChange };
};

export default useSortList;
