FROM node:16.16-alpine as build

ARG ENVIRONMENT
ENV NODE_ENV=development
ENV FRONTEND_ENV=$ENVIRONMENT

# set your working directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_OPTIONS=--max_old_space_size=3048

COPY package*.json ./

RUN yarn 

COPY . ./


RUN yarn build:${ENVIRONMENT}
# RUN yarn build:storybook

# production environment
FROM nginx:stable-alpine
#COPY --from=build /app/packages/component-kit/storybook-static/ /usr/share/nginx/port81
COPY --from=build /app/dist/ /usr/share/nginx/port80
# COPY --from=build /app/storybook-static/ /usr/share/nginx/port80/components


# add your nginx configurations
COPY ./default.conf /etc/nginx/conf.d/default.conf

# expose port
EXPOSE 80 81

CMD ["nginx", "-g", "daemon off;"]


## To Run this file Fire below command
## sudo docker build -t miw .
## sudo docker build -t miw --build-arg ENVIRONMENT=development . 
## sudo docker build -t miw --build-arg ENVIRONMENT=qa . 
## sudo docker build -t miw --build-arg ENVIRONMENT=production . 
## sudo docker build -t miw --build-arg ENVIRONMENT=demo . 
## To run run container
## sudo docker run -d -p 3004:80 miw
