import fs from "fs/promises";
import type { ArticleBaseAttributes } from "#root/types";

export default async function (
  filePath: string,
  fileName: string
): Promise<ArticleBaseAttributes> {
  const res: string = await fs.readFile(filePath, "utf-8");

  const dataParts: string[] = res.split("---");
  const rawTags: string = dataParts[1] || "";
  const tagNames: string[] =
    rawTags.match(/-\s*(\w+)/g)?.map((tag) => {
      return tag.replace(/-\s*/, "");
    }) || [];
  const content: string = dataParts[2] || "";

  const readFileData: ArticleBaseAttributes = {
    name: fileName,
    content: content,
    tags: tagNames,
  };

  return readFileData;
}
