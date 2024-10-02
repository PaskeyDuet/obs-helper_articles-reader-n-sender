import type { listOfUpdates, listsOfUpdatedArticles } from "#root/types";
import path from "path";
import articlesReader from "./articleReader";

export default async function (
  pathsMap: Map<string, string>,
  listOfUpdates: listOfUpdates
) {
  const sortedUpdatedArticlesData: listsOfUpdatedArticles = {
    created: [],
    updated: [],
    deleted: [],
  };

  for (const value in listOfUpdates) {
    const currArr = listOfUpdates[value];
    if (currArr) {
      if (value === "deleted") {
        const arr = listOfUpdates.deleted;
        sortedUpdatedArticlesData.deleted.push(...arr);
        continue;
      }
      const promises = currArr.map(async (fileName) => {
        const fileParentPath = pathsMap.get(`${fileName}.md`);
        if (fileParentPath) {
          const fileAbsPath = path.join(fileParentPath, `${fileName}.md`);
          try {
            return await articlesReader(fileAbsPath, fileName);
          } catch (error) {
            throw new Error("findAndReadUpdatedFiles error:", error as Error);
          }
        }
      });
      // eslint-disable-next-line no-await-in-loop
      const result = await Promise.all(promises);
      const filteredRes = result.filter((article) => article !== undefined);
      sortedUpdatedArticlesData[value]?.push(...filteredRes);
    }
  }
  return sortedUpdatedArticlesData;
}
