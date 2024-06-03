import express from "express";
import cors from "cors";

import todoRouter from "./router/todo";
import { errorHandler } from "./middleware/error-handler";

const app = express();
const PORT = 8080;

const corsOptions = {
    origin: "http://localhost:3000", // CORSポリシーで許可するオリジンを指定します。この場合、localhostの3000ポートからのアクセスを許可します。
    optionsSuccessStatus: 200, // プリフライトリクエストのレスポンスとして返すHTTPステータスコードを指定します。　プリフライトリクエストとは、ブラウザがCORSポリシーを遵守するために行う特別なHTTPリクエスト
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // 許可するHTTPメソッドを指定します。
    credentials: true, // クレデンシャル付きのリクエスト（クッキーや認証情報を含むリクエスト）を許可するかどうかを指定します。
}

app.use(express.json());
app.use(cors(corsOptions));

app.use("/todo", todoRouter);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Running Server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
