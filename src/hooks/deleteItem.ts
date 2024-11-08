import { APIClient } from "../services/Http";
const deleteItem = async <T>(
  id: number,
  service: APIClient<T>
): Promise<boolean> => {
  try {
    await service.DeleteOne(id);
    return true; // Deletion was successful
  } catch (error) {
    return false; // Deletion failed
  }
};

export default deleteItem;
