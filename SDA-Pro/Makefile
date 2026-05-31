.PHONY: up down test logs clean

up:
	docker-compose up --build -d
	@echo "SDA-Pro started. Dashboard: http://localhost:3000"
	@echo "RabbitMQ UI: http://localhost:15672"

down:
	docker-compose down

logs:
	docker-compose logs -f

test:
	chmod +x scripts/integration-test/e2e.test.sh
	bash scripts/integration-test/e2e.test.sh

clean:
	docker-compose down -v
	docker system prune -f