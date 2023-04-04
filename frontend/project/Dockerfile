FROM node:latest
WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY . .
RUN npm install
CMD ["npm", "start"]
