import { buildAuthReq } from "../utils/helpers/requestBuilders";

const baseUrl = `${import.meta.env.VITE_API_URL}/auth`;

export type FormValuesLogin = {
  email: string;
  password: string;
};

export type FormValuesRegister = {
  email: string;
  password: string;
  name: string;
  last_name: string;
};

export async function signup(registrationFields: object) {
  const res = await fetch(baseUrl+ "/register", buildAuthReq(registrationFields));
  const data = await res.json();
  handleAuthResError(data);
  return data;
}

export async function login(loginFields: object) {
  const res = await fetch(baseUrl + "/login", buildAuthReq(loginFields));
  const data = await res.json();
  handleAuthResError(data);
  return data;
}

const handleAuthResError = (data:Record<string, unknown>) => {
  if(data.statusCode === 400 && data.message){
    throw new Error(data.message as string);
  }
  if(data.statusCode && (data.statusCode !=200 || data.statusCode != 201)){
    throw new Error('Internal server error. Please try again later');
  }
}