import express from "express";

// any terminal request should have authentification
export interface TerminalResBody {
  success: boolean;
  data?: string;
  error?: string;
}

export interface LsResBody extends TerminalResBody {
  path: string;
}

export interface CdResBody extends TerminalResBody {
  path: string;
}

export interface EchoResBody extends TerminalResBody {
  file: string;
}

export interface ReadResBody extends TerminalResBody {
  file: string;
  numBytes?: number;
  offset?: number;
}

export interface RmResBody extends TerminalResBody {
  file: string;
}

export interface RmdirResBody extends TerminalResBody {
  name: string;
}

export interface MkdirResBody extends TerminalResBody {
  name: string;
}

export interface WriteResBody extends TerminalResBody {
  file: string;
  contents: string;
  numBytes?: number;
  offset?: number;
  append?: boolean;
}
