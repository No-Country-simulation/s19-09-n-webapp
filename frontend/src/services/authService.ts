import { buildAuthReq } from "../utils/helpers/requestBuilders";

const baseUrl = "https://s19-09-n-back.vercel.app/api/v1/auth"

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