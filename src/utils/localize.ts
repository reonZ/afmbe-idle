import * as R from "remeda";

function localize(...args: LocalizeArgs): string {
    const data = args.length > 1 && R.isObjectType(args.at(-1)) ? args.pop() : undefined;
    const path = R.pipe(
        args as string[],
        R.map((x) => x.trim()),
        R.filter(R.isTruthy),
        R.join("."),
    );
    return _loc(path, data as Record<string, any> | undefined);
}

type LocalizeArgs = [string, ...string[]] | [string, ...string[], string | Record<string, any>];

export { localize };
export type { LocalizeArgs };
