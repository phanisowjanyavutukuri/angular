FROM node:8
RUN mkdir /frontend
COPY ./int/ /frontend
WORKDIR /frontend
RUN npm install
RUN npm run-script build --prod

FROM nginx

COPY --from=0  /frontend/dist    /usr/share/nginx/html/
COPY ./default /etc/nginx/conf.d/default.conf
