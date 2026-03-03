FROM node:18-slim
WORKDIR /app
COPY . .
RUN npm install -g serve
EXPOSE 8080
CMD ["serve", "-p", "8080", "."]