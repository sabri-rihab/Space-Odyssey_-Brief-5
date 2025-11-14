✈️ Projet : Formulaire de Réservation Dynamique (Front-End Only)

Ce projet consiste à améliorer une interface de réservation existante en ajoutant plusieurs fonctionnalités côté client sans backend.
L’objectif est de créer une application front-end complète utilisant JavaScript, HTML, et CSS/Tailwind, tout en conservant la conception graphique d’origine.

🎯 Fonctionnalités demandées
1️⃣ Authentification simulée (JavaScript)
Connexion simple côté client.
Aucune base de données : la connexion est simulée via des données statiques.
Gestion d’un état “connecté / déconnecté”.

2️⃣ Formulaire de réservation dynamique
Le formulaire doit s’adapter selon les choix de l’utilisateur :
Choix de la destination
Sélection du nombre de passagers
Génération dynamique des champs de chaque passager
Sélection de la date
Mise à jour automatique du contenu du formulaire

3️⃣ Validation côté client
Vérification des champs obligatoires
Format email / téléphone
Dates valides
Vérification que tous les passagers ont rempli leurs informations

4️⃣ CRUD local des réservations
Stockage local via localStorage :
Créer une réservation
Modifier une réservation existante
Annuler / supprimer une réservation
Affichage de la liste des réservations enregistrées
Aucune API externe n’est utilisée.

5️⃣ Générateur de billet imprimable (Ticket PDF / HTML)
Génération d’un billet à partir d’une réservation
Mise en page simple : infos du vol + passagers
Version imprimable ou téléchargeable

🛠️ Technologies utilisées
HTML5
CSS3 / TailwindCSS
JavaScript Vanilla
LocalStorage
DOM Manipulation

🚀 Comment utiliser le projet
Cloner le projet
Ouvrir le fichier index.html dans un navigateur
Tester :
la connexion simulée
le formulaire dynamique
les actions CRUD
l'impression du ticket
Aucun serveur n’est nécessaire.

📂 Structure du projet (exemple simplifié)
/project
│
├── about.html
├── accommodations.json
├── AllData.json
├── booking.html
├── booking.js
├── destination.json
├── destinations.html
├── index.css
├── index.html
├── login.html
├── login.js
├── myBooking.html
├── myBooking.js
├── planification.txt
├── spacecraft.json
├── style.css
├── test.html
├── ticket.html
├── ticket.js
├── users.json
|___ README.md

📌 Objectif pédagogique
Ce projet permet de pratiquer :
La manipulation du DOM
La création d’interfaces dynamiques
La validation des formulaires
Le stockage local (localStorage)




La gestion d’un mini “workflow” de réservation

La structuration d’un projet front-end complet
