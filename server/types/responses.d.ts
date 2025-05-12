import express from "express";

// any terminal request should have authentification
interface terminalResBody {
  success: boolean;
  data?: string;
  error?: string;
}

interface cdResBody extends terminalResBody {
  file: string;
}

interface echoResBody extends terminalResBody {
  file: string;
}

interface catResBody extends terminalResBody {
  file: string;
}

interface rmResBody extends terminalResBody {
  file: string;
}

interface mkdirResBody extends terminalResBody {
  name: string;
}

interface touchResBody extends terminalResBody {
  name: string;
}
