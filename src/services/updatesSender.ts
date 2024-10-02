import type {
  DbApiResArr,
  listsOfUpdatedArticles,
  requestStatus,
} from "#root/types";

export default async (
  updates: listsOfUpdatedArticles
): Promise<requestStatus> => {
  try {
    const data = JSON.stringify(updates);
    const url = "http://localhost:3001/updates_handler/create_update";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Accept: "application/json",
      },
      body: data,
    });

    if (res.status === 200) {
      const resJSON = (await res.json()) as DbApiResArr;
      return {
        status: "success",
        response: resJSON,
      };
    } else {
      throw new Error("fetch failed");
    }
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "uknown Error";
    return {
      status: "error",
      error: errMessage,
    };
  }
};
