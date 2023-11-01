FROM nginx
MAINTAINER jeecgos@163.com
VOLUME /tmp
ENV LANG en_US.UTF-8

RUN echo "map \$http_upgrade \$connection_upgrade { \
                default upgrade; \
                ''      close; \
          } " > /etc/nginx/conf.d/default.conf

RUN echo "server {  \
                  listen       80; \
                  server_name  xingpan.chinagoods.com; \
                  location   /jeecgboot/ { \
                      proxy_pass              http://172.18.5.25:28080/jeecg-boot/; \
                      proxy_redirect          off; \
                      proxy_http_version      1.1; \
                      proxy_set_header        Host jeecg-boot-system; \
                      proxy_set_header        X-Real-IP \$remote_addr; \
                      proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for; \
                      client_body_timeout     300s; \
                      proxy_connect_timeout   600s; \
                      proxy_read_timeout      600s; \
                      proxy_send_timeout      600s; \
                      proxy_set_header        Upgrade \$http_upgrade; \
                      proxy_set_header        Connection \$connection_upgrade; \
                  } \
                  location   /jeecg-boot/ { \
                      proxy_pass              http://172.18.5.25:28080/; \
                      proxy_redirect          off; \
                      proxy_http_version      1.1; \
                      proxy_set_header        Host jeecg-boot-system; \
                      proxy_set_header        X-Real-IP \$remote_addr; \
                      proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for; \
                      client_body_timeout     300s; \
                      proxy_connect_timeout   600s; \
                      proxy_read_timeout      600s; \
                      proxy_send_timeout      600s; \
                      proxy_set_header        Upgrade \$http_upgrade; \
                      proxy_set_header        Connection \$connection_upgrade; \
                  } \

                  #解决Router(mode: 'history')模式下，刷新路由地址不能找到页面的问题 \
                  location / { \
                      root   /var/www/html/; \
                      index  index.html index.htm; \
                      if (!-e \$request_filename) { \
                          rewrite ^(.*)\$ /index.html?s=\$1 last; \
                          break; \
                      } \
                  } \
                  location ^~ /h5/ { \
                      root   /var/www/html/h5/; \
                      index  index.html index.htm; \
                      autoindex on; \
                  } \
                  access_log  /var/log/nginx/access.log ; \
              } " >> /etc/nginx/conf.d/default.conf \
    &&  mkdir  -p  /var/www \
    &&  mkdir -p /var/www/html

ADD dist/ /var/www/html/
EXPOSE 80
EXPOSE 443
