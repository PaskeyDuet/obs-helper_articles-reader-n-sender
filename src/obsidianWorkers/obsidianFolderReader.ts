import path from "path";
import fs from "fs/promises";
import sanitizedConfig from "#root/config";

export default async function (addRoute?: string): Promise<string[]> {
  const obsFolderPath = path.resolve(sanitizedConfig.OBS_FOLDER_PATH);

  let fullPath = obsFolderPath;
  if (addRoute) {
    fullPath = path.join(obsFolderPath, "/", addRoute);
  }
  try {
    return await fs.readdir(fullPath);
  } catch (error) {
    throw new Error(`Error reading directory at ${fullPath}: ${error}`);
  }
}
