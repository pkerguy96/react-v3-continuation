import { APIClient } from "../services/Http";
const getUrls = async <T>(id: string, service: APIClient<T>): Promise<any> => {
  try {
    const data = await service.getUrl(id);
    return data;
  } catch (error) {
    console.error("fetching failed:", error);
    return false;
  }
};

export default getUrls;
