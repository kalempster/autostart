import { promisify } from "util";

import { commandJoin } from "command-join";
import WinReg from "winreg";

import { AutoStart } from "../autostart";

export class WindowsAutoStart extends AutoStart {
    private reg = new WinReg({
        hive: WinReg.HKCU,
        key: "\\Software\\Microsoft\\Windows\\CurrentVersion\\Run",
    });

    override async enable(): Promise<void> {
        const { name, reg } = this;

        const line = commandJoin(["start /B", this.command]);

        await promisify(reg.set.bind(reg))(name, WinReg.REG_SZ, line);
    }

    override async disable(): Promise<void> {
        const { name, reg } = this;

        if (!(await this.isEnabled())) {
            return;
        }

        await promisify(reg.remove.bind(reg))(name);
    }

    override async isEnabled(): Promise<boolean> {
        const { name, reg } = this;

        return promisify(reg.valueExists.bind(reg))(name);
    }
}
