FROM node:16-alpine as build 
ENV NODE_ENV production


WORKDIR /app

COPY ["package.json","./"]
RUN npm install --production
COPY . ./
RUN npm run build

# prod env

FROM nginx:stable-alpine as production
COPY --from=build /app/build /usr/share/nginx/html
# COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]