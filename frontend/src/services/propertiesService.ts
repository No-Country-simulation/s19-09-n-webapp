import { FiltersInterface } from "../types/filtersInterface";
import { buildUserImgUploadReq, buildUserReq } from "../utils/helpers/requestBuilders";
import { placeholderProperties } from "../Data/Properties";
import { mapRawPropertyToBackend } from "../utils/helpers/rawPropertyMappers";
// import { mapProperty } from "../utils/helpers/propertyMapper";

const endpoint = "https://s19-09-n-back.vercel.app/api/v1/real-estate";

export async function getProperties(filters: FiltersInterface, page: number) {
  const url = new URL(endpoint);
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
  const res = await fetch(`${endpoint}/${id}`);
  const data = await res.json();
  return data;
}

export async function getUserProperties(token: string) {
  const res = await fetch(`${endpoint}/`, buildUserReq("GET", token));
  const data = await res.json();
  return data;
}

export async function postProperty(rawInputs: object, token: string) {
  const newProperty = mapRawPropertyToBackend(rawInputs);
  console.log(newProperty);
  const res = await fetch(`${endpoint}/creat`, buildUserReq("POST", token, newProperty));
  const data = await res.json();
  return data;
}

export async function postPropertyImg(token: string, imgInput: object, propertyId: string) {
  const res = await fetch(`${endpoint}/${propertyId}/uploadS`, buildUserImgUploadReq("POST", token, imgInput));
  const data = await res.json();
  console.log(data);
}

export async function patchProperty(id: number, inputs: object, token: string) {
  const res = await fetch(
    `${endpoint}/${id}`,
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
