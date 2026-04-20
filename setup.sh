#!/bin/bash
# GMinsta - Project Setup Script
# Run this after npm install in backend folder to initialize the project

echo "🚀 GMinsta Project Setup"
echo "================================"

# Check if backend folder exists
if [ ! -d "backend" ]; then
    echo "❌ Error: backend folder not found"
    exit 1
fi

# Check if frontend folder exists
if [ ! -d "frontend" ]; then
    echo "❌ Error: frontend folder not found"
    exit 1
fi

# Check if database folder exists
if [ ! -d "database" ]; then
    echo "❌ Error: database folder not found"
    exit 1
fi

echo "✅ Project structure verified"
echo ""
echo "📋 Next Steps:"
echo "1. Create MySQL database:"
echo "   mysql -u root -p < database/schema.sql"
echo ""
echo "2. Create backend .env file:"
echo "   cp backend/.env.example backend/.env"
echo "   # Edit .env with your database password"
echo ""
echo "3. Install backend dependencies:"
echo "   cd backend"
echo "   npm install"
echo ""
echo "4. Start backend server:"
echo "   npm start"
echo ""
echo "5. In another terminal, open frontend:"
echo "   - Option A: Open frontend/index.html with Live Server (VS Code)"
echo "   - Option B: cd frontend && python3 -m http.server 8000"
echo ""
echo "6. Open browser:"
echo "   http://localhost:8000 (or port shown by Live Server)"
echo ""
echo "================================"
echo "For more help, read START_HERE.md"
echo "================================"
