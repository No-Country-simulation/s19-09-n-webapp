export function buildAuthReq(fields: object): RequestInit {
  return {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(fields)
  }
}