location / {
  root   /usr/share/nginx/html;
  index  index.html index.htm;
  
  if ($request_uri ~ ^/(.*)\.html$) {
    return 302 $scheme://$http_host/$1;
  }
  try_files $uri $uri.html $uri/ =404;
  
  add_header 'X-Application-Parameters' '$args' always;
}

location ~* ^/detail/(?P<arg1>\S+)$ {
  rewrite "^.*$" /detail.html?detail=$arg1;
}

location /dummy-api {
  root   /usr/share/nginx;
  index  index.html index.htm;
}

location /patternlab {
  root   /usr/share/nginx;
  index  index.html index.htm;
}

location /sassdoc {
  root   /usr/share/nginx;
  index  index.html index.htm;
}

location /typedoc {
  root   /usr/share/nginx;
  index  index.html index.htm;
}