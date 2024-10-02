import cascadeReading from "#obs-workers/cascadeReading.ts";
import findAndReadUpdatedFiles from "#obs-workers/findAndReadUpdatedFiles.ts";
import obsidianFolderReader from "../src/obsidianWorkers/obsidianFolderReader.ts";
import splitMdsFolders from "../src/obsidianWorkers/splitMdsFolders.ts";
import updatedFileNamesCollector from "../src/obsidianWorkers/updatedFileNamesCollector.ts";
import type {
  folderMdObj,
  listOfUpdates,
  listsOfUpdatedArticles,
} from "../src/types.ts";
import { describe } from "@jest/globals";

const t = {
  workers: "obsidian workers testing",
};

describe(t.workers, () => {
  let filePaths: Map<string, string>;
  let vaultReaderRes: string[];
  let mdsFoldersSplitterRes: folderMdObj;
  let collectedFileNames: listOfUpdates;
  let updatedFilesWithContent: listsOfUpdatedArticles;

  beforeEach(async () => {
    try {
      filePaths = await cascadeReading();
      vaultReaderRes = await obsidianFolderReader();
      mdsFoldersSplitterRes = await splitMdsFolders(vaultReaderRes);
      if (!mdsFoldersSplitterRes.mdFiles[0]) {
        throw new Error("Empty md list");
      }
      collectedFileNames = await updatedFileNamesCollector(
        mdsFoldersSplitterRes.mdFiles[0]
      );
      updatedFilesWithContent = await findAndReadUpdatedFiles(
        filePaths,
        collectedFileNames
      );
    } catch (error) {
      throw new Error(`An error occured during ${t.workers}`);
    }
  });

  describe("Reading obsidian folder", () => {
    test("Obsidian vault root reading", async () => {
      expect(vaultReaderRes).toContain(".obsidian");
    });
    test("Obsidian vault folders reading", async () => {
      const testFolds = mdsFoldersSplitterRes.folders;

      expect(testFolds.length).toBeGreaterThan(0);
      expect(() => {
        obsidianFolderReader(testFolds[0]);
      }).not.toThrow();
    });
    test("wrong path of the obsidian vault", async () => {
      const wrongFilePath = "never-existing-path";

      await expect(obsidianFolderReader(wrongFilePath)).rejects.toThrow(Error);
      try {
        await obsidianFolderReader(wrongFilePath);
      } catch (error) {
        expect((error as Error).message).toMatch(new RegExp(wrongFilePath));
      }
    });
  });

  describe("split folder names and .md files and create obj", () => {
    test("obj has folder and name properties", async () => {
      expect(Object.keys(mdsFoldersSplitterRes)).toEqual([
        "folders",
        "mdFiles",
      ]);
    });
  });

  describe("Reading list of updates", () => {
    test("Proof all keys", () => {
      expect(Object.keys(collectedFileNames)).toEqual([
        "created",
        "updated",
        "deleted",
      ]);
    });

    test("Test values are arrays", () => {
      const arrs = Object.values(collectedFileNames);
      arrs.forEach((arr) => {
        expect(typeof arr).toBe("object");
      });
    });
    //TODO: Add mock testing
    test("Test if func works if value arrays are empty", () => {});
  });

  describe("find and read updated files", () => {});
});
