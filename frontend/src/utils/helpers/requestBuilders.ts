export function buildAuthReq(fields: object): RequestInit {
  return {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(fields),
  };
}

export function buildUserReq(
  method: string,
  token: string,
  inputs?: object
): RequestInit {
  const reqInit: RequestInit = {
    method: method,
  };
  const reqHeaders = new Headers();
  reqHeaders.append("Authorization", `Bearer ${token}`);
  if (inputs) {
    reqHeaders.append("Content-Type", "application/json");
    reqInit.body = JSON.stringify(inputs);
  }
  reqInit.headers = reqHeaders;
  return reqInit;
}

export function buildUserImgUploadReq(method: string, token: string, inputs: object): RequestInit {
  const body = new FormData();
  for (const [key, value] of Object.entries(inputs)) body.append(key, value);
  const reqInit: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`,
    },
    body: body,
  };

  return reqInit;
}
