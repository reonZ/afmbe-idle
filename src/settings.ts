import { SettingRegistration } from "@7h3laughingman/foundry-types/client/helpers/client-settings.mjs";
import { id } from "../system.json";

function registerSettings() {
    registerSetting("metric", { type: Boolean, default: false });
}

function registerSetting(key: keyof typeof game.afmbe.settings, data: Omit<SettingRegistration, "name" | "hint">) {
    game.settings.register(id, key, {
        ...data,
        scope: data.scope ?? CONST.SETTING_SCOPES.WORLD,
        name: `afmbe.settings.${key}.name`,
        hint: `afmbe.settings.${key}.hint`,
        onChange: (value: any) => {
            game.afmbe.settings[key] = value;
            data.onChange?.(value);
        },
    });

    game.afmbe.settings[key] = game.settings.get(id, key) as any;
}

export { registerSettings };
