#!/bin/bash

# Docker build and run scripts for Dietbro

# Build the Docker image
build() {
    echo "🔨 Building Dietbro Docker image..."
    docker build -t dietbro-app:latest .
    echo "✅ Build complete!"
}

# Run the container
run() {
    echo "🚀 Starting Dietbro container..."
    docker run -d \
        --name dietbro-container \
        -p 3000:80 \
        --restart unless-stopped \
        dietbro-app:latest
    echo "✅ Container started! Visit http://localhost:3000"
}

# Stop and remove container
stop() {
    echo "🛑 Stopping Dietbro container..."
    docker stop dietbro-container 2>/dev/null || true
    docker rm dietbro-container 2>/dev/null || true
    echo "✅ Container stopped and removed!"
}

# View logs
logs() {
    echo "📋 Viewing container logs..."
    docker logs -f dietbro-container
}

# Restart container
restart() {
    stop
    run
}

# Show container status
status() {
    echo "📊 Container status:"
    docker ps -a | grep dietbro-container || echo "Container not found"
}

# Docker Compose commands
compose-up() {
    echo "🚀 Starting with Docker Compose..."
    docker-compose up -d
    echo "✅ Services started! Visit http://localhost:3000"
}

compose-down() {
    echo "🛑 Stopping Docker Compose services..."
    docker-compose down
    echo "✅ Services stopped!"
}

# Help function
help() {
    echo "🍽️  Dietbro Docker Management Script"
    echo ""
    echo "Usage: ./docker-scripts.sh [command]"
    echo ""
    echo "Commands:"
    echo "  build          Build the Docker image"
    echo "  run            Run the container"
    echo "  stop           Stop and remove container"
    echo "  restart        Restart the container"
    echo "  logs           View container logs"
    echo "  status         Show container status"
    echo "  compose-up     Start with Docker Compose"
    echo "  compose-down   Stop Docker Compose services"
    echo "  help           Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./docker-scripts.sh build"
    echo "  ./docker-scripts.sh run"
    echo "  ./docker-scripts.sh logs"
}

# Main script logic
case "$1" in
    build)
        build
        ;;
    run)
        run
        ;;
    stop)
        stop
        ;;
    restart)
        restart
        ;;
    logs)
        logs
        ;;
    status)
        status
        ;;
    compose-up)
        compose-up
        ;;
    compose-down)
        compose-down
        ;;
    help|*)
        help
        ;;
esac