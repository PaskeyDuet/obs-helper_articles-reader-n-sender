import sanitizedConfig from "#root/config";
import fs from "fs/promises";
import path from "path";

const codingDirPath = path.join(sanitizedConfig.OBS_FOLDER_PATH, "Coding");

export default async function (
  dirPath: string = codingDirPath
): Promise<Map<string, string>> {
  const readFolder = await fs.readdir(dirPath, {
    withFileTypes: true,
    recursive: true,
    encoding: "utf-8",
  });

  const filePaths = new Map<string, string>();
  readFolder.forEach((el) => {
    if (el.isFile()) {
      filePaths.set(el.name, el.parentPath);
    }
  });

  return filePaths;
}
