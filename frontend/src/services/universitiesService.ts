const baseUrl = `${import.meta.env.VITE_API_URL}/univ`;

export async function getCitiesList() {
  const res = await fetch(`${baseUrl}/cities`);
  const data = await res.json();
  return data;
}

export async function getUniversitiesByCity(city: string) {
  const res = await fetch(`${baseUrl}?city=${city}&minimum=false`);
  const data = await res.json();
  return data;
}

export async function getUniversitiesMin() {
  const res = await fetch(`${baseUrl}`);
  const data = await res.json();
  return data;
}
