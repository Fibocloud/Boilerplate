FROM mhart/alpine-node:16 as builder
ARG BACK_URL
ARG FILE_GET_URL
WORKDIR /next/app
ENV VITE_API_URL=$BACK_URL
ENV VITE_FILE_GET_URL=$FILE_GET_URL
COPY package.json ./
RUN yarn
COPY . .
RUN yarn build

# production environment
FROM nginx:stable-alpine
COPY --from=builder /next/app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
