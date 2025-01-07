import { FiltersInterface } from "../types/filtersInterface";
import { buildUserImgUploadReq, buildUserReq } from "../utils/helpers/requestBuilders";
import { placeholderProperties } from "../Data/Properties";
// import { mapProperty } from "../utils/helpers/propertyMapper";

const baseUrl = `${import.meta.env.VITE_API_URL}/real-estate`

export type RealStateCreate = {
  property_type:string;
  city: string;
  title: string;
  address: string;
  min_rental_period: string;
  payment_by_period: number;
  services: {service_id:string}[];
  rooms: {room_id: string, quantity: number}[];
  near_universities: {university_id: string, distance: number}[];
  max_occupants: number;
  is_furnished: boolean;
}

export type RealStateForm = {
  property_type:string;
  city: string;
  title: string;
  address: string;
  min_rental_period: string;
  payment_by_period: string;
  services: {id:string, type:string}[];
  rooms: {id: string, quantity: number}[];
  near_universities: {id: string, name:string}[];
  max_occupants: number;
  is_furnished: boolean;
}

const mapFormToApi = (formData:RealStateForm):RealStateCreate => {
  const services = formData.services.map(
    (service: { id: string; type: string }) => ({ service_id: service.id })
  );
  const near_universities = formData.near_universities.map(
    (univ: { id: string; name: string }) => ({
      university_id: univ.id,
      distance: 350,
    })
  );
  const rooms = formData.rooms.map(
    (el)=>({room_id:el.id, quantity:el.quantity})
  )
  const data: RealStateCreate = {
    ...formData,
    services,
    near_universities,
    payment_by_period: parseFloat(formData.payment_by_period),
    max_occupants: 1,
    rooms
  };
  return data;
}

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

export async function postProperty(inputs: RealStateForm) {
  const loggedUser = JSON.parse(localStorage.getItem("userStorage")!);
  const res = await fetch(`${baseUrl}/create`, buildUserReq("POST", loggedUser.state.user.token, mapFormToApi(inputs)));
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
