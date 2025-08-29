import { IntranetDocumentCategoryEnum } from "../intranet";

export interface GetIntranetUserDocumentsItem {
  id: string;
  key: string;
  name: string;
  description: string;
  category: IntranetDocumentCategoryEnum;
  status: string;
  type: string;
  reviewNumber: string;
  version: string;
  storageType: string;
  storageKey: string;
  createdAt: string;
  createdById: string;
  createdBy: string;
  versionCreatedById: string;
  versionCreatedBy: string;
  signedUrl: string;
}
