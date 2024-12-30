import { FiltersInterface } from "../types/filtersInterface";
import { buildUserImgUploadReq, buildUserReq } from "../utils/helpers/requestBuilders";
import { placeholderProperties } from "../Data/Properties";
// import { mapProperty } from "../utils/helpers/propertyMapper";

const baseUrl = `${import.meta.env.BASE_URL}/real-estate`

export async function getProperties(filters: FiltersInterface, page: number) {
  const url = new URL(baseUrl);
  for (const [filter, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null && value !== "" && value !== 0)
      url.searchParams.append(filter, String(value));
  }
  url.searchParams.append("page", String(page));
  console.log("Enviar al back:",url.href);
  // const res = await fetch(url.href);
  // const rawData = await res.json();
  // const data = rawData.map(property => mapProperty(property));
  return placeholderProperties;
}

export async function getProperty(id: number) {
  const res = await fetch(`${baseUrl}/${id}`);
  const data = await res.json();
  return data;
}

export async function getUserProperties(token: string) {
  const res = await fetch(`${baseUrl}/`, buildUserReq("GET", token));
  const data = await res.json();
  return data;
}

export async function postProperty(inputs: object, token: string) {
  const res = await fetch(`${baseUrl}/create`, buildUserReq("POST", token, inputs));
  const data = await res.json();
  return data;
}

export async function postPropertyImg(token: string, imgInput: object, propertyId: string) {
  const res = await fetch(`${baseUrl}/${propertyId}/uploadS`, buildUserImgUploadReq("POST", token, imgInput));
  const data = await res.json();
  console.log(data);
}

export async function patchProperty(id: number, inputs: object, token: string) {
  const res = await fetch(
    `${baseUrl}/${id}`,
    buildUserReq("PATCH", token, inputs)
  );
  const data = await res.json();
  return data;
}

export async function getUserRentals(token: string) {
  const res = await fetch(`${baseUrl}/`, buildUserReq("GET", token));
  const data = await res.json();
  return data;
}
