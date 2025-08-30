import { IntranetDocumentTypeEnum } from "@/types/intranet";

export const getDocumentType = (type?: IntranetDocumentTypeEnum) => {
  if (!type) {
    return "N/D";
  }

  const map = {
    [IntranetDocumentTypeEnum.INTEGRATION_KIT]: "Kit Integração",
    [IntranetDocumentTypeEnum.POLICY]: "Politica",
    [IntranetDocumentTypeEnum.POP]: "Pop",
  };

  return map[type];
};
