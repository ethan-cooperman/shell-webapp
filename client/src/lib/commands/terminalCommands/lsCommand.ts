import parseResponse from "@/lib/utils/parseResponse";
import {
  TerminalCommand,
  TerminalCommandInput,
  Result,
  RequestBody,
} from "@/types/Terminal";

const doLs: TerminalCommand = async (input: TerminalCommandInput) => {
  // make sure we have arguments
  if (input.argv.length === 0) {
    return {
      output: `ls: expected 0-1 arguments`,
      isError: true,
    };
  }

  // give cwd and path, if path is given
  const requestBody: RequestBody = { cwd: input.cwdRef.current, path: "." };
  if (input.argv.length == 2) {
    requestBody.path = input.argv[1];
  }

  // fetch from api as json
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/api/ls`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_AUTH}`,
      },
      body: JSON.stringify(requestBody),
    });

    // parse http response
    const responseParseResult: Result<string> = await parseResponse(response);

    // return appropriate terminal response object
    if (responseParseResult.success) {
      return { isError: false, output: responseParseResult.value };
    } else {
      return { isError: true, output: responseParseResult.error };
    }
  } catch {
    return { isError: true, output: "Could not connect to file server" };
  }
};

export default doLs;
