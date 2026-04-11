import SailingNationsApi from "./sailingNationsApi";

export const getSailingNations = async () => {
  const sailingNationsApi = new SailingNationsApi({});
  return await sailingNationsApi.get();
};