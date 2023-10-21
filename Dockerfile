FROM node:alpine
WORKDIR /GlamourGallery/customerauth-service
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8075
CMD ["npm","run", "dev"]