const toType = (obj) => {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
export default function(expectedType, currentType) {
    const error = new Error(`Returned incorrect type of data. Expected ${expectedType} instead of ${toType(currentType)} `);

    error.code = "THIS_IS_A_CUSTOM_ERROR_CODE";
    return error;
}