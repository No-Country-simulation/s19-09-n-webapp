export function buildAuthReq(fields: object): RequestInit {
  return {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(fields),
  };
}

export function buildUserPropertiesReq(
  method: string,
  token: string,
  inputs?: object
): RequestInit {
  const reqInit: RequestInit = {
    method: method,
  };
  const reqHeaders = new Headers();
  reqHeaders.append("Authorization", `Bearer ${token}`);
  if (inputs) reqHeaders.append("Content-Type", "application/json");
  reqInit.headers = reqHeaders;
  return reqInit;
}
