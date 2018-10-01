FROM node:8
RUN mkdir /frontend
COPY ./ /frontend
WORKDIR /frontend
RUN npm install 
RUN ng build --prod

FROM nginx

COPY --from=0  /frontend    /usr/share/nginx/html/
RUN sed -i 's% /usr/share/nginx/html% /usr/share/nginx/html/dist/sample%' /etc/nginx/conf.d/default.conf


