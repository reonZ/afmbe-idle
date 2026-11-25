function logObject(name: string, obj: object) {
    let i = 2;
    let variable = name;

    // @ts-ignore
    while (window[variable]) {
        variable = `${name}${i++}`;
    }

    // @ts-ignore
    window[variable] = obj;
    console.log(variable, obj);
}

export { logObject };
