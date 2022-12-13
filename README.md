# MyEDTScrapper-Front

MyEDTPlanner est une suite de module permettant la récupération et l'affichage du planning des cours d'une classe de l'université d'Évry par la biais de scrapping du site [https://edt.univ-evry.fr](edt.univ-evry.fr).

## Configuration

Pour faire fonctionner ce projet, vous aller devoir remplir les variables d'environnements dans un fichier .env (utilisez le fichier example.env comme base et renomer le en .env)

Variables d'environnements :

| Nom               | Description                      |
|-------------------|----------------------------------|
| REACT_APP_API_URL | http://localhost:2001            |

Pour la réalisation de tests, il est également possible d'utiliser l'API fictive disponnible à l'adresse `http://api.myedtplanner.lichou.co` (le contenu retourné est toujours le même, évite de faire trop de récupération de données).

## Installation

Clone du projet
```bash
git clone https://github.com/MyEDTPlanner/MyEDTScrapper-Front.git
```

Se rendre dans le répertoire du projet
```bash
cd MyEDTScrapper-Front
````

Installer les dépendances
```bash
npm install
```

Compiler les fichiers
```bash
npm start
```

## Contribution

Merci de lire les fichiers :
* [CODE-OF-CONDUCT](https://github.com/MyEDTPlanner/MyEDTScrapper-Front/blob/19-ajout-dun-code-de-conduite/CODE-OF-CONDUCT.md)

## Auteurs
N'hésitez pas à améliorer ce projet. N'oubliez pas de vous ajouter au fichier [AUTHORS](https://github.com/MyEDTPlanner/MyEDTScrapper-Front/blob/21-ajout-dun-fichier-AUTHORS/AUTHORS).

## License

Ce projet est sous la licence GNU GPL V3 - voir le fichier [license](https://github.com/MyEDTPlanner/MyEDTScrapper-Front/blob/14-ajout-dune-licence/License) pour plus de détails.
