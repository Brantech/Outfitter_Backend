exports.parseOptionalInt = (string, radix) => {
    return string ? parseInt(string, radix) : undefined;
}