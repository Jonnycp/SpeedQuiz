
function healthCheck(req, res) {
    res.json({ message: "Il server funziona" });
}

module.exports = {
    healthCheck
};