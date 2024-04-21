import { homedir } from "os";
import { join } from "path";
import { unlink } from "fs/promises";
import { AutoStart } from "../autostart";

export class MacOSAutoStart extends AutoStart {
    private launchAgentFilePath = join(homedir(), `Library/LaunchAgents/${this.name}.plist`);

    override async enable(): Promise<void> {
        const content = `\
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${this.name}</string>
  <key>ProgramArguments</key>
  <array>
${splitCommand(this.command)}
  </array>
  <key>RunAtLoad</key>
  <true/>
</dict>
</plist>
`;

        await Bun.write(this.launchAgentFilePath, content);
    }

    override async disable(): Promise<void> {
        if (!(await this.isEnabled())) {
            return;
        }

        await unlink(this.launchAgentFilePath);
    }

    override async isEnabled(): Promise<boolean> {
        return await Bun.file(this.launchAgentFilePath).exists();
    }
}

function splitCommand(command: string): string[] {
    const regex = /[^\s"]+|"([^"]*)"/gi;
    const args: string[] = [];
    let match: RegExpExecArray | null;

    do {
        match = regex.exec(command);
        if (match !== null) {
            args.push(match[1] ? match[1] : match[0]);
        }
    } while (match !== null);

    return args;
}
