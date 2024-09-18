const admin = require("firebase-admin")
var serverAccount = require("../key/chave_para_database.json")

admin.initializeApp({
    credential: admin.credential.cert(serverAccount)
})

module.exports = admin