"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const todo_1 = __importDefault(require("./router/todo"));
const error_handler_1 = require("./middleware/error-handler");
const app = (0, express_1.default)();
const PORT = 8080;
const corsOptions = {
    origin: "http://localhost:3000", // CORSポリシーで許可するオリジンを指定します。この場合、localhostの3000ポートからのアクセスを許可します。
    optionsSuccessStatus: 200, // プリフライトリクエストのレスポンスとして返すHTTPステータスコードを指定します。　プリフライトリクエストとは、ブラウザがCORSポリシーを遵守するために行う特別なHTTPリクエスト
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // 許可するHTTPメソッドを指定します。
    credentials: true, // クレデンシャル付きのリクエスト（クッキーや認証情報を含むリクエスト）を許可するかどうかを指定します。
};
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.use("/todo", todo_1.default);
app.use(error_handler_1.errorHandler);
app.get("/", (req, res) => {
    res.send("Running Server!");
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
