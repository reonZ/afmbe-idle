import * as R from "remeda";

function localize(...args: [string, ...string[]] | [string, ...string[], string | Record<string, any>]): string {
    const data = args.length > 1 && R.isObjectType(args.at(-1)) ? args.pop() : undefined;
    const path = ["afmbe", ...(args as string[])];
    return _loc(R.join(path, "."), data as Record<string, any> | undefined);
}

export { localize };
