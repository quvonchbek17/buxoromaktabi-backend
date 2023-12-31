const bcrypt = require('bcrypt');

module.exports.generateHash = async function (password) {
    let salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

module.exports.compareHash = function (password, hash) {
    return bcrypt.compareSync(password, hash)
}