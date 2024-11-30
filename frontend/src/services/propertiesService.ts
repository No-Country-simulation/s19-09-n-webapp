import { FiltersInterface } from "../store/filtersStore";

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
  return { data };
}

export async function getProperty(id: number) {
  const res = await fetch(`${endpoint}/${id}`);
  const data = await res.json();
  return { data };
}
