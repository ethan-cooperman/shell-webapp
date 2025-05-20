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
  file: string;
}

export interface EchoResBody extends TerminalResBody {
  file: string;
}

export interface CatResBody extends TerminalResBody {
  file: string;
}

export interface RmResBody extends TerminalResBody {
  file: string;
}

export interface MkdirResBody extends TerminalResBody {
  name: string;
}

export interface TouchResBody extends TerminalResBody {
  name: string;
}
