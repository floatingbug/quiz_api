require("dotenv").config();
const {createStore} = require("./src/stores/createStore");
const store = createStore();
const {createApi} = require("./createApi");
const api = createApi({store});
const server = require("http").createServer(api);


server.listen(3000);
