import { buildAuthReq } from "../utils/helpers/requestBuilders";

const baseUrl = `${import.meta.env.VITE_API_URL}/auth`

export async function signup(registrationFields: object) {
  const res = await fetch(baseUrl+ "/register", buildAuthReq(registrationFields));
  const data = await res.json();
  if(data.statusCode == 400){
    throw new Error(data.message);
  }
  return data;
}

export async function login(loginFields: object) {
  const res = await fetch(baseUrl + "/login", buildAuthReq(loginFields));
  const data = await res.json();
  return data;
}