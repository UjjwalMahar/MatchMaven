FROM node:lts-alpine

WORKDIR /app  

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV FIREBASE_KEY="AIzaSyA9gph7tscWtQT-YzgfH521I1OAmvWELK8"
ENV FIREBASE_AUTH_DOMAIN="matchmavenn.firebaseapp.com"
ENV FIREBASE_PROJECT_ID="matchmavenn"
ENV FIREBASE_STORAGE_BUCKET="matchmavenn.appspot.com"
ENV FIREBASE_MESSAGING_SENDER_ID="577474773617"
ENV FIREBASE_DATABASE_URL="https://matchmavenn-default-rtdb.firebaseio.com"

CMD ["npm", "run", "dev"]
