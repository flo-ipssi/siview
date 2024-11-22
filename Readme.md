## **Présentation du Test Siview**
Ce projet représente la partie backend de l'application, développée avec Laravel et utilisant Vue 3. Il interagit avec le frontend et la base de données MySQL pour gérer les dépenses et autres informations.

---

## **Prérequis**
- Docker et Docker Compose doivent être installés sur votre machine.

---

## **Étapes pour Lancer le Backend**

1. **Cloner le Dépôt**
   ```bash
   git clone https://github.com/flo-ipssi/siview
   cd siview

2. **Démarrer le service avec Docker Compose**
   ```bash
   docker-compose up -d --build

3. **Renommer le fichier env**
   ```bash
   cd siview
   cd back
   mv .env.example .env

4. **Pour accéder au conteneur PhpMyAdmin** 
   ID : root
   Mot de passe : root
   ```bash
   [http://localhost:8081/](http://localhost:8081/)

### **Informations supplémentaires pour compléter l'installation**

1. **Générer les clés d'application Laravel**
   ```bash
   docker exec -it back php artisan key:generate

2. **Migrations de la base de données :**
   ```bash
   docker exec -it back php artisan migrate
   
3. **Accéder au shell du conteneur**
   ```bash
   docker exec -it back bash

4. **Installer et lancer les tests avec Pest**
   ```bash
   docker exec -it back bash
   composer require pestphp/pest --dev
   vendor/bin/pest --init
   vendor/bin/pest

5. **Arrêter le service**
   ```bash
   docker-compose down



### **Étapes pour Lancer le Frontend**

1. **Installer les dépendances**
   ```bash
     docker exec -it front bash 
     npm install
   ```
2. **Accéder à l'Application**
   ```bash
   docker exec -it front  npm run dev 
   ```
   [http://localhost:8080](http://localhost:8080)


# TROUBLESHOOTING #
### **Si le frontend ne s'affiche pas**
1. **Réinstaller les dépendances et installer les packages avec Node **
   ```bash
      cd front
      npm install
      npm run dev
   ```
   [http://localhost:8080](http://localhost:8080)