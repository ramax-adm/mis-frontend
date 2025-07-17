import { GetFetch, urls } from "../axios/api-base";

export async function GetSyncedFiles({
  date,
  entity,
}: {
  date?: Date | null;
  entity?: string | null;
}) {
  const response = await GetFetch(urls.UTILS.GET_SYNCED_FILES, {
    params: { date, entity },
  });

  return response.data;
}

export async function GetSyncedFileSignedUrl({ id }: { id: string }) {
  const response = await GetFetch(
    urls.UTILS.GET_SYNCED_FILE_SIGNED_URL.replace(":id", id)
  );

  return response.data;
}

export async function GetSyncedFileEntities() {
  const response = await GetFetch(urls.UTILS.GET_SYNCED_FILE_ENTITIESL);

  return response.data;
}

export async function GetUnitTypes() {
  const response = await GetFetch(urls.UTILS.GET_UNIT_TYPES);

  return response.data;
}
