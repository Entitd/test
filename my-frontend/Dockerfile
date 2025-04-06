# Этап сборки (build stage)
FROM node:18-alpine as builder

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта
COPY . .

# Собираем React-приложение
RUN npm run build

# Этап продакшена (production stage)
FROM nginx:alpine

# Копируем собранные файлы из builder в nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Копируем конфиг Nginx (если нужно)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]