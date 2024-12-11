import axios from "axios";
import {
  IAppUsers,
  ICategories,
  ISettings,
  ISignIn,
  ISignUpUser,
} from "@/common/interfaces";
import { getAuthFromLocal } from "./store";

export interface QueryParamDto {
  role?: string;
  startsAt?: Date;
  endsAt?: Date;
  limit?: number;
  page?: number;
  status?: string;
  sender?: string;
  courier?: string;
  type?: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Auth Request
export function httpLogin(authObject: ISignIn) {
  return axios.post(`${API_URL}/auth/sign-in`, authObject);
}

export async function httpRegister(authObject: ISignUpUser) {
  return await axios.post(`${API_URL}/admin/auth/sign-up`, authObject);
}

// Category Request
export async function httpCreateCategory(value: ICategories) {
  return axios.post(`${API_URL}/categories`, value, {
    headers: {
      Authorization: "Bearer " + getAuthFromLocal(),
    },
  });
}

export async function httpGetCategories(query?: QueryParamDto) {
  const response = await axios.get(`${API_URL}/categories`, {
    headers: {
      Authorization: "Bearer " + getAuthFromLocal(),
    },
    params: { ...query },
  });
  return response.data.data;
}

export async function httpGetTransactions(query?: QueryParamDto) {
  const response = await axios.get(`${API_URL}/admin/transactions`, {
    headers: {
      Authorization: "Bearer " + getAuthFromLocal(),
    },
    params: { ...query },
  });
  return response.data.data;
}

export async function httpGetStats(query?: QueryParamDto) {
  const response = await axios.get(`${API_URL}/admin/dashboard/stats`, {
    headers: {
      Authorization: "Bearer " + getAuthFromLocal(),
    },
    params: { ...query },
  });
  return response.data;
}

export async function httpGetRecentDelivery(query?: QueryParamDto) {
  const response = await axios.get(
    `${API_URL}/admin/dashboard/recent-deliveries`,
    {
      headers: {
        Authorization: "Bearer " + getAuthFromLocal(),
      },
      params: { ...query },
    }
  );
  return response.data.data;
}

export async function httpUpdateCategoryById(id: string, object: ICategories) {
  return await axios.put(`${API_URL}/categories/${id}`, object, {
    headers: {
      Authorization: "Bearer " + getAuthFromLocal(),
    },
  });
}

export async function httpDeleteCategoryById({ id }: { id: string }) {
  return axios.delete(`${API_URL}/categories/${id}`, {
    headers: {
      Authorization: "Bearer " + getAuthFromLocal(),
    },
  });
}

export async function httpGetReconciliationData(query?: QueryParamDto) {
  const response = await axios.get(`${API_URL}/admin/transactions`, {
    headers: {
      Authorization: "Bearer " + getAuthFromLocal(),
    },
    params: { ...query },
  });
  return response.data.data;
}

// Setting Request
export async function httpCreateSetting(Obj: ISettings) {
  return axios.post(`${API_URL}/admin/settings/rider`, Obj, {
    headers: { Authorization: "Bearer " + getAuthFromLocal() },
  });
}
export async function httpGetSettings() {
  return axios.get(`${API_URL}/admin/settings/rider`, {
    headers: {
      Authorization: "Bearer " + getAuthFromLocal(),
    },
  });
}

export async function httpUpdateSettingById(id: string, data: ISettings) {
  return await axios.patch(`${API_URL}/admin/settings/rider/${id}`, data, {
    headers: {
      Authorization: "Bearer " + getAuthFromLocal(),
    },
  });
}

export async function httpGetSettingByWeight(weight: string) {
  return await axios.get(`${API_URL}/admin/settings/rider/${weight}`, {
    headers: {
      Authorization: "Bearer " + getAuthFromLocal(),
    },
  });
}

export async function httpGetCourierDetailById(id: string) {
  return axios.get(`${API_URL}/admin/couriers/${id}`, {
    headers: {
      Authorization: "Bearer " + getAuthFromLocal(),
    },
  });
}

// User
export async function httpGetUsers() {
  return axios.get(`${API_URL}/admin/users`, {
    headers: {
      Authorization: "Bearer " + getAuthFromLocal(),
    },
  });
}

export async function httpUpdateUserById(id: string, data: Partial<IAppUsers>) {
  return await axios.patch(`${API_URL}/admin/couriers/${id}`, data, {
    headers: {
      Authorization: "Bearer " + getAuthFromLocal(),
    },
  });
}
