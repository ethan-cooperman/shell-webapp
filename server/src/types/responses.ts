import express from "express";

interface TerminalSuccess {
  success: true;
  data?: string;
}
interface TerminalError {
  success: false;
  error?: string;
}
export type TerminalResBody = TerminalSuccess | TerminalError;
