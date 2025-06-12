import { setupWorker } from "msw/browser";
import { boardsHandlers } from "./handler";
import { authHandlers } from "./handler/auth";


export const worker = setupWorker(...boardsHandlers, ...authHandlers);