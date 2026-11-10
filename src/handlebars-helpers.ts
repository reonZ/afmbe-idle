import { HelperDelegate, HelperOptions } from "handlebars";
import * as R from "remeda";

function templateArray(...args: Parameters<HelperDelegate>) {
    if (args.length < 2) return "";

    const options = args.pop() as HelperOptions;
    const lastIndex = args.length - 1;

    return R.pipe(
        args,
        R.map((entry, index) => {
            return options.fn(entry, {
                blockParams: [entry, index],
                data: {
                    first: index === 0,
                    index,
                    last: index === lastIndex,
                },
            });
        }),
        R.join(""),
    );
}

function templateLocalize(...args: Parameters<HelperDelegate>): string {
    if (args.length < 2) return "";

    const options = args.at(-1) as HelperOptions;
    const path = R.map(args.slice(0, -1), (str) => {
        return str instanceof Handlebars.SafeString ? str.toString() : str;
    });

    return _loc(R.join(path, "."), options.hash);
}

function templateDot(...args: Parameters<HelperDelegate>) {
    if (args.length < 3) return;

    const parent = args[0];
    if (!R.isObjectType(parent)) return;

    if (parent instanceof Map) {
        return parent.get(args[1]);
    }

    const path = R.join(args.slice(1, -1), ".");
    return foundry.utils.getProperty(parent, path);
}

export default {
    array: templateArray,
    dot: templateDot,
    localize: templateLocalize,
};
