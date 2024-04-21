import { resolve } from "path";

export type AutoStartRunOptions = {
    /**
     * Command to run, defaults to `process.execPath`.
     */
    command?: string;
};

export abstract class AutoStart {
    readonly command: string;

    readonly name: string;

    constructor(
        /**
         * Name of the startup run instance, used as identifier.
         */
        name: string,
        { command = process.execPath }: AutoStartRunOptions = {}
    ) {

        this.name = name;
        this.command = command;
    }

    abstract enable(): Promise<void>;

    abstract disable(): Promise<void>;

    abstract isEnabled(): Promise<boolean>;

    static create: (name: string, options?: AutoStartRunOptions) => AutoStart = () => {
        throw new Error("Not implemented.");
    };
}
