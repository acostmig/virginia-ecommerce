FROM nginx:alpine
# Add the Nginx configuration file
ADD ./nginx.conf /etc/nginx/nginx.conf
COPY --from=front-end /app/build /usr/share/nginx/html
RUN mkdir logs 
RUN cd ./logs && touch error.log && touch access.log
EXPOSE 80
