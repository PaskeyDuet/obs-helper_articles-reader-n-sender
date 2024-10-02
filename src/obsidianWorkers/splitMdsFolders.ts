import type { folderMdObj } from "#root/types";

export default function (arr: string[]): folderMdObj {
  //TODO: It is beter to improve this func by using fs.Dirent objects array
  const extensionsRegExp = /\.(\w+)$/;
  return arr.reduce<folderMdObj>(
    (acc, name) => {
      if (name.endsWith(".md")) {
        acc.mdFiles.push(name);
      } else if (extensionsRegExp.test(name)) {
        return acc;
      } else {
        acc.folders.push(name);
      }
      return acc;
    },
    { folders: [], mdFiles: [] }
  );
}
