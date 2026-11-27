import { fromUuidSync } from "@7h3laughingman/foundry-types/client/utils/_module.mjs";

function getDocumentFromUUIDSync<T extends keyof DocumentTypeMap, D = InstanceType<DocumentTypeMap[T]>>(
    type: T,
    uuid: Maybe<string>,
): D | null {
    if (!uuid) return null;

    const DocumentCls = getDocumentClass(type);
    const doc = fromUuidSync(uuid);

    return doc instanceof DocumentCls ? (doc as any) : null;
}

export { getDocumentFromUUIDSync };
