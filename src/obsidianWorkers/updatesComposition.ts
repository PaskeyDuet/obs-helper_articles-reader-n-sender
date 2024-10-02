import splitMdFolder from "#obs-workers/splitMdsFolders";
import updatedFileNamesCollector from "#obs-workers/updatedFileNamesCollector";
import obsidianFolderReader from "#obs-workers/obsidianFolderReader";
import cascadeReading from "#obs-workers/cascadeReading";
import findAndReadUpdatedFiles from "#obs-workers/findAndReadUpdatedFiles";
import type { listsOfUpdatedArticles, updatesResObj } from "#root/types";

async function composition(): Promise<listsOfUpdatedArticles> {
  const allFiles = await cascadeReading();
  const res1 = await obsidianFolderReader();
  const res2 = splitMdFolder(res1);
  const updatesFileName = res2.mdFiles[0];
  if (!updatesFileName) {
    throw new Error();
  }
  const res3 = await updatedFileNamesCollector(updatesFileName);
  const res4 = await findAndReadUpdatedFiles(allFiles, res3);
  return res4;
}

export default async (): Promise<updatesResObj> => {
  try {
    const res = await composition();
    return {
      status: "success",
      data: res,
    };
  } catch (err) {
    console.error(err);
    return {
      status: "error",
      data: null,
      error: err as Error,
    };
  }
};
