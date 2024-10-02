import updatesComposition from "#obs-workers/updatesComposition";
import type { requestStatus } from "#root/types";
import updatesSender from "./updatesSender";

export default async (): Promise<requestStatus> => {
  try {
    const compositionRes = await updatesComposition();
    if (compositionRes.data) {
      const updates = compositionRes.data;
      const res = await updatesSender(updates);
      if (res.status === "success" && res.response) {
        return {
          status: "success",
          response: res.response,
        };
      } else {
        throw new Error("Программа не смогла отправить данные на сервер");
      }
    } else {
      throw new Error("Lack of data in composition");
    }
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "uknown Error";
    return {
      status: "error",
      error: errMessage,
    };
  }
};
