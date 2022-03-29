module.exports = async (tx, type) => {
    return type.scan_url + tx;
};