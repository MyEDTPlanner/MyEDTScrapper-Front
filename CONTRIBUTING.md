Vous souhaitez contribuer à ce projet ? vous trouverez ci-dessous les détails sur la façon de le faire.
## Forker ce dépôt

Fork ce dépôt en cliquant sur le bouton fork en haut de cette page.
Cela créera une copie de ce dépôt dans votre compte.

## Cloner le dépôt

<img align="right" width="300" src="https://firstcontributions.github.io/assets/Readme/clone.png" alt="clone this repository" />

Maintenant, clonez le dépôt forké sur votre machine. Allez sur votre compte GitHub, ouvrez le dépôt forké, cliquez sur le bouton code et ensuite sur l'icône _copy to clipboard_.

Ouvrez un terminal et exécutez la commande git suivante :

```
git clone "url que vous venez de copier"
```

où "url que vous venez de copier" (sans les guillemets) est l'url de ce dépôt (votre fork de ce projet). Voir les étapes précédentes pour obtenir l'url.

<img align="right" width="300" src="https://firstcontributions.github.io/assets/Readme/copy-to-clipboard.png" alt="copy URL to clipboard" />

For example:

```
git clone https://github.com/this-is-you/MyEDTPlanner/MyEDTScrapper-Front.git
```

où `this-is-you` est votre nom d'utilisateur GitHub. Ici, vous copiez le contenu du dépôt MyEDTScrapper-Front de GitHub sur votre ordinateur.

## Créer une branche

Passez dans le répertoire du dépôt sur votre ordinateur (si vous n'y êtes pas déjà) :

```
cd first-contributions
```

Maintenant, créez une branche en utilisant la commande `git switch` :

```
git switch -c your-new-branch-name
```

## Effectuer les changements nécessaires et valider ces changements

Maintenant, ouvrez le fichier `AUTHORS` dans un éditeur de texte, ajoutez-y votre nom. Ne l'ajoutez pas au début ou à la fin du fichier. Mettez-le n'importe où entre les deux. Maintenant, enregistrez le fichier.



Si vous allez dans le répertoire du projet et exécutez la commande `git status`, vous verrez qu'il y a des changements.

Ajoutez ces changements à la branche que vous venez de créer en utilisant la commande `git add` :

```
git add AUTHORS.md
```
Maintenant, livrez ces changements en utilisant la commande `git commit` en ajoutant un gitmoji qui correspond à vos modification   :

```
git commit -m " :gitmoji: Add your-name to AUTHORS list"
```

en remplaçant `your-name` par votre nom.

## Pousser les changements vers GitHub

Poussez vos changements en utilisant la commande `git push` :

```
git push -u origin your-branch-name
```

en remplaçant `your-branch-name` par le nom de la branche que vous avez créée précédemment.

## Soumettez vos modifications pour examen

Si vous allez sur votre dépôt sur GitHub, vous verrez un bouton `Compare & pull request`. Cliquez sur ce bouton.

<img style="float: right;" src="https://firstcontributions.github.io/assets/Readme/compare-and-pull.png" alt="create a pull request" />

Maintenant, soumettez la demande de pull.

<img style="float: right;" src="https://firstcontributions.github.io/assets/Readme/submit-pull-request.png" alt="submit pull request" />

Bientôt, je vais merger toutes vos modifications dans la branche principale de ce projet. Vous recevrez un courriel de notification une fois que les changements auront été fusionnés.
