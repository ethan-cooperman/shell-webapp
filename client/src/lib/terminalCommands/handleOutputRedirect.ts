import parseResponse from "@/lib/utils/parseResponse";
import { Result, RequestBody, TerminalResponse } from "@/types/Terminal";
import { RefObject } from "react";

/**
 * Helper function to redirect output to a file
 * @param output contents of output to write
 * @param outputRedirectFile file path to redirect to
 * @param isAppend whether we should truncate or append
 * @param cwdRef ref to cwd string filepath
 */
export default async function handleOutputRedirect(
  output: string,
  outputRedirectFile: string,
  isAppend: boolean,
  cwdRef: RefObject<string>
): Promise<TerminalResponse> {
  // make request body
  const requestBody: RequestBody = {
    cwd: cwdRef.current,
    file: outputRedirectFile,
    contents: output,
    append: isAppend,
  };

  // write to api
  // fetch from api as json
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_PATH}/api/write`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_AUTH}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    // parse http response
    const responseParseResult: Result<string> = await parseResponse(response);

    // return appropriate terminal response object
    if (responseParseResult.success) {
      return { isError: false, output: "" };
    } else {
      return { isError: true, output: responseParseResult.error };
    }
  } catch {
    return { isError: true, output: "Could not connect to file server" };
  }
}
