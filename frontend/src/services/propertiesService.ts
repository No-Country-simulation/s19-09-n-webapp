import { FiltersInterface } from "../store/filtersStore";
import { buildUserPropertiesReq } from "../utils/helpers/requestBuilders";

const endpoint = "https://s19-09-n-back.vercel.app/";

export async function getProperties(filters: FiltersInterface, page: number) {
  const url = new URL(endpoint);
  for (const [filter, value] of Object.entries(filters)) {
    if (value !== undefined) url.searchParams.append(filter, String(value));
  }
  url.searchParams.append("page", String(page));
  console.log(url.href);
  const res = await fetch(url.href);
  const data = await res.json();
  return data;
}

export async function getProperty(id: number) {
  const res = await fetch(`${endpoint}/${id}`);
  const data = await res.json();
  return data;
}

export async function getUserProperties(token: string) {
  const res = await fetch(`${endpoint}/`, buildUserPropertiesReq("GET", token));
  const data = await res.json();
  return data;
}
