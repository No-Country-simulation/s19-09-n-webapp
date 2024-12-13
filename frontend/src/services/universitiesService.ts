const baseUrl = "https://s19-09-n-back.vercel.app/api/v1";
const univUri = "univ";


export async function getCitiesList() {
  const res = await fetch(`${baseUrl}/${univUri}/cities`);
  const data = await res.json();
  return data;
}

export async function getUniversitiesByCity(city:string) {
  const res = await fetch(`${baseUrl}/${univUri}?city=${city}&minimum=false`);
  const data = await res.json();
  return data;

}