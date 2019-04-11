exports.parseOptionalInt = (string, radix) => {
    return intString ? parseInt(string, radix) : undefined;
}