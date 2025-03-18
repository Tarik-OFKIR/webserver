# Utilisation de l'image officielle Node.js
FROM node:18

# Définition du répertoire de travail
WORKDIR /app

# Copier les fichiers du projet
COPY package.json package-lock.json ./
RUN npm install

# Copier le reste du code source
COPY . .

# Exposer le port du backend
EXPOSE 5000

# Lancer le serveur
CMD ["node", "server.js"]
