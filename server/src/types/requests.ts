export interface TerminalReqBody {
  cwd: string;
}

export function isTerminalReqBody(obj: unknown): obj is TerminalReqBody {
  return (
    "cwd" in (obj as Object) && typeof (obj as TerminalReqBody).cwd === "string"
  );
}

export interface LsReqBody extends TerminalReqBody {
  path: string;
}

export function isLsReqBody(obj: unknown): obj is LsReqBody {
  return (
    isTerminalReqBody(obj) &&
    "path" in obj &&
    typeof (obj as LsReqBody).path == "string"
  );
}

export interface CdReqBody extends TerminalReqBody {
  file: string;
}

export function isCdReqBody(obj: unknown): obj is CdReqBody {
  return (
    isTerminalReqBody(obj) &&
    "file" in obj &&
    typeof (obj as CdReqBody).file === "string"
  );
}

export interface EchoReqBody extends TerminalReqBody {
  file: string;
}

// Type guard for EchoReqBody
export function isEchoReqBody(obj: unknown): obj is EchoReqBody {
  return (
    isTerminalReqBody(obj) &&
    "file" in obj &&
    typeof (obj as EchoReqBody).file === "string"
  );
}

export interface CatReqBody extends TerminalReqBody {
  file: string;
}

// Type guard for CatReqBody
export function isCatReqBody(obj: unknown): obj is CatReqBody {
  return (
    isTerminalReqBody(obj) &&
    "file" in obj &&
    typeof (obj as CatReqBody).file === "string"
  );
}

export interface RmReqBody extends TerminalReqBody {
  file: string;
}

// Type guard for RmReqBody
export function isRmReqBody(obj: unknown): obj is RmReqBody {
  return (
    isTerminalReqBody(obj) &&
    "file" in obj &&
    typeof (obj as RmReqBody).file === "string"
  );
}

export interface MkdirReqBody extends TerminalReqBody {
  name: string;
}

// Type guard for MkdirReqBody
export function isMkdirReqBody(obj: unknown): obj is MkdirReqBody {
  return (
    isTerminalReqBody(obj) &&
    "name" in obj &&
    typeof (obj as MkdirReqBody).name === "string"
  );
}

export interface TouchReqBody extends TerminalReqBody {
  name: string;
}

// Type guard for TouchReqBody
export function isTouchReqBody(obj: unknown): obj is TouchReqBody {
  return (
    isTerminalReqBody(obj) &&
    "name" in obj &&
    typeof (obj as TouchReqBody).name === "string"
  );
}
