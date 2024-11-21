
#### Objectif

Développez une application web permettant aux utilisateurs de suivre leurs dépenses mensuelles, de catégoriser les dépenses et de générer des rapports. L'application doit être réalisée en utilisant Laravel pour le backend (API) et Vue 3 pour le frontend. Le projet doit être configuré pour fonctionner dans un environnement conteneurisé Docker.

### Exigences

#### Front-End (Vue 3)

1.  **Technologies** : Utilisez Vue 3.
2.  **Interface Utilisateur** :
    -   **Page de Connexion** : Permettre aux utilisateurs de se connecter.
    -   **Tableau de Bord** : Afficher un résumé des dépenses mensuelles.
    -   **Formulaire d'Ajout de Dépenses** : Permettre aux utilisateurs d'ajouter des dépenses avec des champs tels que le montant, la catégorie, la date, et une description.
    -   **Liste des Dépenses** : Afficher la liste des dépenses avec la possibilité de les filtrer par date et catégorie.
    -   **Graphiques** : Générer des graphiques pour visualiser les dépenses par catégorie et par période.
    -   **Validation des Entrées** : Assurer la validation des champs du formulaire pour éviter les entrées incorrectes.

#### Back-End (Laravel)

1.  **Technologies** : Utilisez Laravel pour créer une API RESTful.
2.  **API REST** :
    -   **Authentification** : Implémenter l'authentification des utilisateurs (inscription, connexion, déconnexion).
    -   **Gestion des Dépenses** : Endpoints pour créer, lire, mettre à jour et supprimer des dépenses.
    -   **Catégorisation** : Endpoints pour gérer les catégories de dépenses.
    -   **Rapports** : Endpoint pour générer des rapports de dépenses par catégorie et par période.
3.  **Base de Données** : Utilisez MySQL ou PostgreSQL pour stocker les données.
4.  **Sécurité** : Assurer le hachage des mots de passe et protéger les endpoints avec des tokens d'authentification (JWT).

#### Environnement Docker

1.  **Docker** : Configurez l'application pour qu'elle fonctionne dans un environnement Docker mutualisé.
2.  **Docker Compose** : Utilisez Docker Compose pour orchestrer les conteneurs pour le frontend, le backend et la base de données.
3.  **Volumes** : Utilisez des volumes Docker pour persister les données de la base de données.

### Structure des Répertoires Attendus

Vous devez créer deux dépôts distincts pour ce projet : un pour le frontend et un pour le backend.

#### Dépôt 1 : Frontend (Vue 3)

-   Répertoire racine du projet Vue 3.
-   Configuration Dockerfile pour le conteneur frontend.
-   Configuration Docker Compose.

#### Dépôt 2 : Backend (Laravel)

-   Répertoire racine du projet Laravel.
-   Configuration Dockerfile pour le conteneur backend.
-   Configuration Docker Compose.
-   Migrations et seeding de la base de données.

### Critères d'Évaluation

1.  **Fonctionnalité** : L'application fonctionne-t-elle comme prévu ? Les fonctionnalités CRUD sont-elles implémentées correctement ?
2.  **Qualité du Code** : Le code est-il propre, bien structuré et commenté ?
3.  **Performance** : L'application est-elle réactive et performante ?
4.  **Sécurité** : Les bonnes pratiques de sécurité sont-elles respectées ?
5.  **UI/UX** : L'interface utilisateur est-elle intuitive et agréable à utiliser ?
6.  **Documentation** : Le projet est-il bien documenté ? Inclut-il des instructions pour l'installation et l'exécution de l'application ?

### Instructions de Soumission

1.  Créez deux dépôts distincts sur GitHub ou une autre plateforme de gestion de code source.
2.  Fournissez un fichier README dans chaque dépôt avec des instructions claires pour configurer et exécuter l'application dans un environnement Docker.
3.  Envoyez les liens vers les deux dépôts pour évaluation.

