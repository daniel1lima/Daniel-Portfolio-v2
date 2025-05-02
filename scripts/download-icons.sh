#!/bin/bash

# Create icons directory if it doesn't exist
mkdir -p public/icons

# Base URL for DevIcon SVGs
BASE_URL="https://raw.githubusercontent.com/devicons/devicon/master/icons"

# Function to download and optimize SVG
download_icon() {
    local name=$1
    local url=$2
    local output="public/icons/${name}.svg"
    
    echo "Downloading $name icon..."
    curl -s "$url" > "$output"
    
    # Basic SVG optimization - only remove width and height
    sed -i '' 's/width="[^"]*"//g' "$output"  # Remove width attributes
    sed -i '' 's/height="[^"]*"//g' "$output"  # Remove height attributes
}

# Download icons
download_icon "typescript" "$BASE_URL/typescript/typescript-original.svg"
download_icon "react" "$BASE_URL/react/react-original.svg"
download_icon "nodejs" "$BASE_URL/nodejs/nodejs-original.svg"
download_icon "postgresql" "$BASE_URL/postgresql/postgresql-original.svg"
download_icon "python" "$BASE_URL/python/python-original.svg"
download_icon "swift" "$BASE_URL/swift/swift-original.svg"
download_icon "tensorflow" "$BASE_URL/tensorflow/tensorflow-original.svg"
download_icon "pytorch" "$BASE_URL/pytorch/pytorch-original.svg"
download_icon "nextjs" "$BASE_URL/nextjs/nextjs-original.svg"
download_icon "tailwind" "$BASE_URL/tailwindcss/tailwindcss-original.svg"
download_icon "mongodb" "$BASE_URL/mongodb/mongodb-original.svg"
download_icon "docker" "$BASE_URL/docker/docker-original.svg"
download_icon "aws" "$BASE_URL/amazonwebservices/amazonwebservices-original.svg"
download_icon "firebase" "$BASE_URL/firebase/firebase-plain.svg"
download_icon "graphql" "$BASE_URL/graphql/graphql-plain.svg"
download_icon "express" "$BASE_URL/express/express-original.svg"
download_icon "javascript" "$BASE_URL/javascript/javascript-original.svg"
download_icon "flask" "$BASE_URL/flask/flask-original.svg"
download_icon "redis" "$BASE_URL/redis/redis-original.svg"
download_icon "neo4j" "$BASE_URL/neo4j/neo4j-original.svg"
download_icon "vercel" "$BASE_URL/vercel/vercel-original.svg"
download_icon "discord" "$BASE_URL/discordjs/discordjs-original.svg"

# Create custom icons for technologies without official DevIcon versions
# API icon
cat > public/icons/api.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v2H8V8zm0 3h8v2H8v-2zm0 3h4v2H8v-2z"/>
</svg>
EOF

# SwiftUI icon
cat > public/icons/swiftui.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
</svg>
EOF

# Analytics icon
cat > public/icons/analytics.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M3 3v18h18V3H3zm16 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"/>
</svg>
EOF

# Automation icon
cat > public/icons/automation.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
</svg>
EOF

# NLP icon
cat > public/icons/nlp.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v2h-2zm0-8h2v6h-2z"/>
</svg>
EOF

# Enterprise AI icon
cat > public/icons/enterprise-ai.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
</svg>
EOF

# DynamoDB icon
cat > public/icons/dynamodb.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
</svg>
EOF

# LangChain icon
cat > public/icons/langchain.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
</svg>
EOF

echo "All icons have been downloaded and optimized!" 