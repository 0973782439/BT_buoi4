import http from "../utils/http";

export const getData = (limit: number) =>
  http.get("photos", { params: { _limit: limit * 10 } });
