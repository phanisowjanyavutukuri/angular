FROM node:8
RUN mkdir /frontend
COPY ./ /frontend
WORKDIR /frontend
RUN npm install
RUN npm run-script build --prod

FROM nginx

RUN mkdir /usr/share/nginx/html/dist
COPY --from=0  /frontend/dist    /usr/share/nginx/html/dist
COPY ./default /etc/nginx/conf.d/default.conf
