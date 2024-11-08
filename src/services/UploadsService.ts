import { APIClient } from "./Http";

interface Patient {
  nom: string;
  prenom: string;
}
export interface UrlList {
  data: string[]; // An array of strings representing URLs
}
export interface ClusterData {
  patientName: Patient[];
  type: string;
  dates: string[];
  totalSize: number;
}
export const UploadServiceApiClient = new APIClient<any>("/Filesupload");
const ShowUploadsServiceApiClient = new APIClient<any>("/uploadsInfo");
export const DeleteUploadServiceClient = new APIClient<any>("/Filesupload");
export default ShowUploadsServiceApiClient;
