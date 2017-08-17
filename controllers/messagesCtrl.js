var messages = {};

messages.index = function(req, res) {
    res.json({ message: "Hello Message!!" });
};

messages.read = function(req, res) {
    res.json({
        id: req.params.id, // 以req.params.id 取得參數

        message: 'The get api for messages: ' + req.params.id
    })
};

messages.create = function(req, res) {
    res.json({
        id: req.params.id,
        message: 'The post api for messages: ' + req.params.id
    })
};

messages.update = function(req, res) {
    res.json({
        id: req.params.id,
        message: 'The put api for messages: ' + req.params.id
    })
};

messages.delete = function(req, res) {
    res.json({
        id: req.params.id,
        message: 'The delete api for messages: ' + req.params.id
    })
};


module.exports = messages;