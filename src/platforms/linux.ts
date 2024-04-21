import { homedir } from "os";
import { join } from "path";
import { unlink } from "fs/promises";

import { AutoStart } from "../autostart";

export class LinuxAutoStart extends AutoStart {
    private autoStartFilePath = join(homedir(), `.config/autostart/${this.name}.desktop`);

    override async enable(): Promise<void> {
        const content = `\
[Desktop Entry]
Type=Application
Version=1.0
Name=${this.name}
Comment=Startup Run
Exec=${this.command}
StartupNotify=false
Terminal=false
`;
        await Bun.write(this.autoStartFilePath, content);
    }

    override async disable() {
        if (!(await this.isEnabled())) {
            return;
        }

        await unlink(this.autoStartFilePath);
    }

    override async isEnabled() {
        return await Bun.file(this.autoStartFilePath).exists();
    }
}
