import type { requestStatus } from "#root/types";

export default async function (apiResponse: requestStatus) {
  if (apiResponse.status === "success") {
    console.log("Update successfuly created\n");
    if (apiResponse.response) {
      let promiseCount = 0;
      const promiseNumbers: string[] = ["First", "Second", "Third"];
      for (const obj of apiResponse.response) {
        if (obj.status === "fulfiled") {
          const number = promiseNumbers[promiseCount];
          console.log(`- ${number} promise fulfiled\n`);
        }
      }
    } else {
      console.log("But there is an empty response");
    }
  }
}
