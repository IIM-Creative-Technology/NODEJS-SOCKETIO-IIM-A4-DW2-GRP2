const path = require('path');

class MainController
{
    static index(req, res)
    {
        res.send('Hello world !');
    }

    static insert(req, res)
    {
        res.send("Got a POST request");
    }

    static socketTest(req, res)
    {
        res.sendFile(path.join(__dirname, '../views/socket-test.html'));
    }
}

module.exports = MainController;