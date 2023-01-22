# Project with the HapiJS framework

## In order to properly start the project:

After cloning the repository, follow these steps:

1. Run the command ```npm install``` from a terminal in the project directory.

2. Start the Docker container with the following command: ```docker run -p 3306:3306 --name hapi-mysql -e MYSQL_ROOT_PASSWORD=hapi -e MYSQL_DATABASE=user -d mysql:5```. This container will be the project's database with ```root``` username and ```hapi``` password.

3. Start the server with the command ```npm start```

From this moment, you can go to the following address: http://localhost:3000/documentation in order to access the different methods of the API.

------

## Afin de démarer le projet correctement : 

Après avoir cloné le repository, suivez les étapes suivantes :

1. Réalisez la commande ```npm install``` depuis un terminal dans le répertoire du projet.

2. Lancez le conteneur docker avec la commande suivante : ```docker run -p 3306:3306 --name hapi-mysql -e MYSQL_ROOT_PASSWORD=hapi -e MYSQL_DATABASE=user -d mysql:5```. Ce conteneur sera la base de données du projet avec comme nom d'utilisateur ```root``` et mot de passe ```hapi```.

3. Démarrez le serveur avec la commande ```npm start```

A partir de ce moment, vous pouvez vous rendre à l'adresse http://localhost:3000/documentation afin d'accéder aux différentes méthodes de l'API.
