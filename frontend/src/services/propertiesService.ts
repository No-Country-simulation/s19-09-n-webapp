import { FiltersInterface } from "../types/filtersInterface";
import { buildUserReq } from "../utils/helpers/requestBuilders";

const endpoint = "https://s19-09-n-back.vercel.app/api/v1/real-estate";

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
  const res = await fetch(`${endpoint}/`, buildUserReq("GET", token));
  const data = await res.json();
  return data;
}

export async function postProperty(inputs: object, token: string) {
  const res = await fetch(`${endpoint}/`, buildUserReq("POST", token, inputs));
  const data = await res.json();
  return data;
}

export async function patchProperty(id: number, inputs: object, token: string) {
  const res = await fetch(
    `${endpoint}//${id}`,
    buildUserReq("PATCH", token, inputs)
  );
  const data = await res.json();
  return data;
}

export async function getUserRentals(token: string) {
  const res = await fetch(`${endpoint}/`, buildUserReq("GET", token));
  const data = await res.json();
  return data;
}
