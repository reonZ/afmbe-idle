import * as R from "remeda";

function splitString<T>(str: string): T[] {
    return R.pipe(
        str,
        R.split(","),
        R.map((x) => x.trim()),
        R.filter(R.isTruthy),
    ) as T[];
}

export { splitString };
