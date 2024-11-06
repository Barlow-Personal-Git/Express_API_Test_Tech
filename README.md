# Express_API_Test_Tech
 
Ceci est fait avec [Express.js](https://expressjs.com/).

Tout d'abord, vous devez installer les dépendances en utilisant l'une des commandes suivantes :
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Ensuite, remplacez `.env-example` par `.env` et ajoutez le `CLIENT_ID` et le `CLIENT_SECRET` inscrits dans le courriel dans ce fichier.

Finalement, démarrez le serveur de développement :
```bash
npm start
# or
yarn start
# or
pnpm start
# or
bun start
```
Ouvrez [http://localhost:8080](http://localhost:8080) dans votre navigateur pour voir le résultat.

## Routes

Deux routes disponibles :
Cette route récupère tous les postes affichés au cours de la journée sous forme de JSON.
[http://localhost:8080/api/today](http://localhost:8080/api/today)

Cette route récupère tous les postes affichés depuis 3 mois à partir d'aujourd'hui. Cependant, comme je n'utilise pas de base de données, il est possible que les postes retournés soient uniquement ceux d'aujourd'hui. Cette route retourne un JSON contenant le nombre de postes dans différentes communes et départements de la France.
[http://localhost:8080/api/statistic](http://localhost:8080/api/statistic)

## Codes

- Le code s'exécute à partir du fichier  `server.js`.
- J'utilise une architecture MVC (Modèle-Vue-Contrôleur), bien qu'il n'y ait pas de vue.
- Toutes les routes sont définies dans le fichier `routes.js`, à l'exception de la toute première page.
- Le dossier `controllers` contient toutes les fonctionnalités, telles que la recherche des postes, le calcul des statistiques et la récupération du token d'accès de France Travail.

