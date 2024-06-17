# ベースイメージとしてnodeの最新版を使用
FROM node:latest

# タイムゾーンを東京に設定
ENV TZ=Asia/Tokyo

# アプリケーションのファイルを含むディレクトリを作成
WORKDIR /app/server

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# Prisma Clientを生成
RUN npx prisma generate

# アプリケーションのソースコードをコピー
COPY . .

# ポート8080でアプリケーションを実行
EXPOSE 8080

# アプリケーションを実行
CMD ["npm", "run", "start"]