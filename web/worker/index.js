import { createEventHandler } from "@remix-run/cloudflare-workers";

// eslint-disable-next-line import/no-unresolved
import * as build from "../build";

addEventListener("fetch", createEventHandler({ build }));
