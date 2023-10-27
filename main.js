const {createApi} = require("./createApi");
const api = createApi();
const server = require("http").createServer(api);


server.listen(8000);
