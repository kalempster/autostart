# @kalempster/autostart

A modified version of [startup-run](https://www.npmjs.com/package/startup-run/v/0.0.1). Enable **autostart** for any command.

# Usage
```ts
import { resolve } from "path";
import { AutoStart } from "@kalempster/autostart";

const autostart = AutoStart.create("autostartname", {
    // Using Bun
    command: `${process.execPath} ${resolve("./index.ts")}`
});

await autostart.enable();

console.log(await autostart.isEnabled()); // true

await autostart.disable();

console.log(await autostart.isEnabled()); // false

```