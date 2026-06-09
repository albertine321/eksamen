# start med Node.js som base image. Ber docker om å bruke node.js sitt offisielle image som utgangspunkt
FROM node:20-alpine

# jobb i denne mappen inne i containeren
WORKDIR /usr/src/app

# kopier package.json inn i containeren
COPY package*.json ./

# installer avhengigheter 
RUN npm install

# kopier resten av koden inn i containeren
COPY . .

# si at port 3001 er tilgjengelig for andre containere og for host-maskinen
EXPOSE 3001

# Define environment variable
ENV NODE_ENV=production

#  # start serveren
CMD ["node", "app.js"]