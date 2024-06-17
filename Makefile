up:
	docker-compose up -d --build

db:
	@echo "Dockerコンテナを起動します..."
	@docker-compose -f docker-compose.local.yaml up -d --build
	@echo "Dockerコンテナが起動しました。"

ps:
	docker-compose -f docker-compose.local.yaml ps

bash:
	docker-compose -f docker-compose.local.yaml exec postgres bash

psgl:
	docker-compose -f docker-compose.local.yaml exec postgres psql -U myuser -d mydb

down:
	docker-compose -f docker-compose.local.yaml down