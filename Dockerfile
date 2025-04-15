FROM nginx:alpine
EXPOSE 80
COPY ./html /usr/share/nginx/html/html
COPY ./scripts /usr/share/nginx/html/scripts
COPY ./index.html /usr/share/nginx/html