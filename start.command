#!/bin/bash
# Start local survey website with automatic port fallback and nodemon autoreload

export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
cd "/Users/ivyz/Documents/Work/Fitness Center" || exit 1

# Kill any old servers on 3000/3001 (so clean restarts don't collide)
for port in 3000 3001; do
  pid=$(lsof -ti :$port)
  if [ -n "$pid" ]; then
    echo "🛑 Stopping process on port $port (PID $pid)..."
    kill -9 $pid
  fi
done

# Pick a free port (prefer 3000, else 3001)
if lsof -i :3000 >/dev/null 2>&1; then
  export PORT=3001
  echo "⚠️  Port 3000 is busy — using 3001"
else
  export PORT=3000
fi

# Sleep a moment before (re)launch to avoid race conditions
sleep 1

# Trap Ctrl+C to exit cleanly
trap "echo 'Exiting…'; exit 0" INT

# Run nodemon (auto-restarts on file changes)
npm run dev