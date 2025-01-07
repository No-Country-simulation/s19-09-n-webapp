const baseUrl = `${import.meta.env.VITE_API_URL}/room-types`;

export async function getAllRoomTypes() {
  const res = await fetch(baseUrl);
  const data = await res.json();
  return data;
}