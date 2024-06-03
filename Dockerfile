# Dockerfile
FROM node:20.11.1

# タイムゾーンを東京に設定
ENV TZ=Asia/Tokyo

# アプリケーションディレクトリを作成
WORKDIR /usr/src/app

# サーバーの依存関係をインストール
COPY server/package*.json ./
RUN npm install

# TypeScript を JavaScript にコンパイル
COPY server/. .
RUN npm install typescript -g
RUN tsc

# Prisma Clientを生成
RUN npx prisma generate

# ポート8080でアプリケーションを実行
EXPOSE 8080

CMD [ "node", "dist/index.js" ]