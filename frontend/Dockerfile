# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Debug - find out what's in the build output
RUN find . -type d -name "dist*" -o -name "build*"

# Production stage
FROM nginx:alpine
# Try one of these options:
# Option 1: For Angular
COPY --from=build /app/dist/* /usr/share/nginx/html/
# Option 2: For Angular with project name
# COPY --from=build /app/dist/frontend/* /usr/share/nginx/html/
# Option 3: For React
# COPY --from=build /app/build/* /usr/share/nginx/html/
# Option 4: For Vue
# COPY --from=build /app/dist/* /usr/share/nginx/html/

# Add this to verify what's in the nginx html directory
RUN ls -la /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
