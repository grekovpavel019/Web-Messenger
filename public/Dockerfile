FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html/
RUN ln -sf /usr/share/nginx/html/register.html /usr/share/nginx/html/index.html

