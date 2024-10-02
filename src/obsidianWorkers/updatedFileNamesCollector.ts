import fs from "fs/promises";
import path from "path";
import sanitizedConfig from "#root/config";
import type { listOfUpdates } from "#root/types";

const obsFolder = sanitizedConfig.OBS_FOLDER_PATH;
export default async function (filePath: string): Promise<listOfUpdates> {
  const absPath = path.join(obsFolder, filePath);
  const data = await fs.readFile(absPath, "utf8");

  const res: listOfUpdates = {
    created: [],
    updated: [],
    deleted: [],
  };
  data.split("### ").forEach((el, index) => {
    if (index === 0) {
      return;
    }

    const matches = el.match(/-\s*(.+)/g) ?? [];
    if (matches.length > 0) {
      const clearedMatches = matches.map((name) => name.replace("- ", ""));
      if (index === 1) {
        res.created = clearedMatches;
      } else if (index === 2) {
        res.updated = clearedMatches;
      } else {
        const clearedDeletes = clearedMatches.map((el) =>
          el.replace(/^.*\//, "").replace(/\.md$/, "")
        );

        res.deleted = clearedDeletes;
      }
    } else {
      if (index === 1) {
        res.created = [];
      } else if (index === 2) {
        res.updated = [];
      } else {
        res.deleted = [];
      }
    }
  });

  return res;
}
