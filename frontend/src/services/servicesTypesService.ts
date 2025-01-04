const baseUrl = `${import.meta.env.VITE_API_URL}/service`


export async function getAllServicesTypes() {
  const res = await fetch(baseUrl);
  const data = await res.json();
  return data;
}