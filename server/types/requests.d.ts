import express from "express";

// any terminal request should have authentification
interface terminalReqBody {
  cred: string;
}

interface lsReqBody extends terminalReqBody {}

interface cdReqBody extends terminalReqBody {
  file: string;
}

interface echoReqBody extends terminalReqBody {
  file: string;
}

interface catReqBody extends terminalReqBody {
  file: string;
}

interface rmReqBody extends terminalReqBody {
  file: string;
}

interface mkdirReqBody extends terminalReqBody {
  name: string;
}

interface touchReqBody extends terminalReqBody {
  name: string;
}
