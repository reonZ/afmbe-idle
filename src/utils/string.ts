import * as R from "remeda";
import { localize } from ".";

function splitString<T>(str: string): T[] {
    return R.pipe(
        str,
        R.split(","),
        R.map((x) => x.trim()),
        R.filter(R.isTruthy),
    ) as T[];
}

function signedNumber(num: number): string {
    return num >= 0 ? `+${num}` : String(num);
}

function getLastNameIndex(baseName: string, list: { name: string }[]): number | undefined {
    const nameRegex = new RegExp(`^${baseName}(?: \\((\\d+)\\))?$`, "i");
    return R.pipe(
        list,
        R.map((source) => source.name.match(nameRegex)),
        R.filter(R.isTruthy),
        R.map(([_, index]) => Number(index) || 0),
        R.sortBy([R.identity(), "desc"]),
        R.first(),
    );
}

function getNextIndexedName(baseName: string, list: { name: string }[]): string {
    baseName = localize(baseName);
    const lastIndex = getLastNameIndex(baseName, list);
    return lastIndex === undefined ? baseName : `${baseName} (${lastIndex + 1})`;
}

export { getNextIndexedName, signedNumber, splitString };
