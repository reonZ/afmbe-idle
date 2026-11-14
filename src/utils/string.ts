import * as R from "remeda";

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
    const nameRegex = new RegExp(`^${baseName}(:? (\\d+))?$`, "i");
    return R.pipe(
        list,
        R.map((source) => source.name.match(nameRegex)),
        R.filter(R.isTruthy),
        R.map(([_, index]) => Number(index) || 0),
        R.sortBy([R.identity(), "desc"]),
        R.first(),
    );
}

function getNextNameIndex(baseName: string, list: { name: string }[]): number | "" {
    const lastIndex = getLastNameIndex(baseName, list);
    return lastIndex === undefined ? "" : lastIndex + 1;
}

export { getNextNameIndex, signedNumber, splitString };
