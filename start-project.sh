if [ -f package.json ]; then
    echo "package.json found. Installing dependencies and starting development server..."
    npm install
    npm run dev
else
    echo "Error: package.json not found in the current directory."
    exit 1
fi