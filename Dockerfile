FROM node:8.2
COPY ./ ./
RUN npm install
RUN npm run build
EXPOSE 4000
CMD [ "npm", "run", "dev" ]
#CMD ["npm", "start"]