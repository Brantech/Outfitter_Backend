const optional = (arg) => {
    return arg ? arg : undefined;
}

const parseOptionalInt = (string, radix) => {
    return optional(parseInt(string, radix));
}

module.exports = {optional, parseOptionalInt};