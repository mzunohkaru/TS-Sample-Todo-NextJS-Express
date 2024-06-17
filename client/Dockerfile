# ベースイメージの指定
FROM node:18

# 作業ディレクトリの設定
WORKDIR /app/client

# 依存関係ファイルのコピー
COPY package*.json ./

# 依存関係のインストール
RUN npm install

# アプリケーションのソースをコピー
COPY . .

# アプリケーションのビルド
RUN npm run build

# アプリケーションの起動
CMD ["npm", "start"]