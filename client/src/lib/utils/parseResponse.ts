import { Result } from "@/types/Terminal";

async function parseResponse(response: Response): Promise<Result<string>> {
  if (response.ok) {
    try {
      const responseJson = await response.json();
      // get output from response
      if ("data" in responseJson) {
        return { success: true, value: responseJson.data };
      } else {
        const errorResult: Result<string> = {
          success: false,
          error: `Response with status ${response.status} did not contain any data`,
        };
        console.error(errorResult.error);
        return errorResult;
      }
    } catch {
      // indicate parsing error and return error
      const errorResult: Result<string> = {
        success: false,
        error: `There was an issue parsing response with status ${response.status}`,
      };
      console.error(errorResult.error);
      return errorResult;
    }
  }
  // if response has error code
  else {
    // store worst case error message with status
    let errorMessage: string = `Request failed with status ${response.status}`;

    // try to get json for more information about error
    try {
      // get error field of response json
      const errorJson = await response.json();
      if (errorJson.message) {
        errorMessage = errorJson.message;
      }
    } catch {
      try {
        // try text as a last resort
        errorMessage = await response.text();
      } catch {}
    }
    console.error(errorMessage);
    return { success: false, error: errorMessage };
  }
}

export default parseResponse;
