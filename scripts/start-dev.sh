#!/bin/bash

# Get script directory and set paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Add trap to handle Ctrl+C
trap 'echo -e "\nScript interrupted by user. Exiting..."; exit 1' SIGINT

echo "-----------------------------------------"
echo "STARTING development servers..."
echo "-----------------------------------------"

# Start the creator server in the background
echo "Starting survey-creator server in the background..."
"$SCRIPT_DIR/start-creator-dev.sh" &
CREATOR_PID=$!

# Give it a moment to start
sleep 2

# Start the library server in the foreground
echo "Starting survey-library server in the foreground..."
"$SCRIPT_DIR/start-library-dev.sh"

# When the library server stops, kill the creator server
kill $CREATOR_PID 2>/dev/null

echo "-----------------------------------------"
echo "All development servers stopped"
echo "-----------------------------------------" 