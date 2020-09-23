const http = require("http")

http.createServer(function(req, res){
    res.end("<h1>Server online</h1>")
}).listen(8001)