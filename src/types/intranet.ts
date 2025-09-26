import { User } from "./user";

export enum IntranetDocumentCategoryEnum {
  DOCUMENT = "document",
  VIDEO = "video",
}

export enum IntranetDocumentTypeEnum {
  POLICY = "policy",
  INTEGRATION_KIT = "integration-kit",
  POP = "pop",
}

export interface IntranetDocument {
  id: string;
  name: string;
  description: string;
  type: IntranetDocumentTypeEnum;
  createdAt: Date;
  createdById: string;
  createdBy: User;
  versions: IntranetDocumentVersion[];
}

export interface IntranetDocumentVersion {
  id: string;
  document: IntranetDocument;
  documentId: string;
  key?: string;
  version?: string;
  reviewNumber?: number;
  majorChanges?: string;
  category?: IntranetDocumentCategoryEnum;
  extension?: string;
  storageType?: string;
  storageKey?: string;
  createdAt: Date;
  createdById: string;
  createdBy: User;
  acceptances: UserIntranetDocumentAcceptance[];
}

export interface UserIntranetDocumentAcceptance {
  id: string;
  userId: string;
  user: User;
  documentVersionId: string;
  documentVersion: IntranetDocumentVersion;
  createdAt: Date;
  ipAddress: string;
  acceptanceTimeInSeconds: number;
}
