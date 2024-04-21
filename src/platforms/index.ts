import { AutoStart } from "../autostart";

import { LinuxAutoStart } from "./linux";
import { MacOSAutoStart } from "./macos";
import { WindowsAutoStart } from "./windows";

switch (process.platform) {
    case "win32":
        AutoStart.create = (...args) => new WindowsAutoStart(...args);
        break;
    case "darwin":
        AutoStart.create = (...args) => new MacOSAutoStart(...args);
        break;
    case "linux":
        AutoStart.create = (...args) => new LinuxAutoStart(...args);
        break;
    default:
        throw new Error(`Unsupported platform ${JSON.stringify(process.platform)}.`);
}

export * from "./linux";
export * from "./macos";
export * from "./windows";
