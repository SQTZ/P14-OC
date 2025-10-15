# Guide de Publication sur NPM

Ce guide explique comment publier le package `simple-react-datepicker` sur npm.

## Prérequis

1. **Compte npm** : Créez un compte sur [npmjs.com](https://www.npmjs.com/)
2. **npm CLI** : Assurez-vous d'avoir npm installé (vient avec Node.js)

## Étapes de publication

### 1. Connexion à npm

```bash
npm login
```

Entrez vos identifiants npm (username, password, email).

### 2. Installation des dépendances

```bash
cd simple-react-datepicker
npm install
```

### 3. Build du package

```bash
npm run build
```

Cela créera le dossier `dist/` avec les fichiers compilés.

### 4. Test du package localement

Avant de publier, testez le package localement :

```bash
# Dans le dossier simple-react-datepicker
npm link

# Dans votre projet de test
cd ../frontend
npm link simple-react-datepicker
```

### 5. Vérification avant publication

```bash
# Vérifier les fichiers qui seront publiés
npm pack --dry-run

# Ou créer un tarball pour inspection
npm pack
```

### 6. Publication

#### Première publication

```bash
npm publish
```

#### Publications suivantes

1. Mettez à jour la version dans `package.json` :
   ```bash
   npm version patch  # 1.0.0 -> 1.0.1
   # ou
   npm version minor  # 1.0.0 -> 1.1.0
   # ou
   npm version major  # 1.0.0 -> 2.0.0
   ```

2. Publiez :
   ```bash
   npm publish
   ```

### 7. Vérification

Vérifiez que votre package est bien publié :
```bash
npm view simple-react-datepicker
```

Ou visitez : `https://www.npmjs.com/package/simple-react-datepicker`

## Notes importantes

### Nom du package

- Le nom `simple-react-datepicker` peut déjà être pris
- Si c'est le cas, choisissez un nom alternatif dans `package.json` :
  - `@votre-username/simple-react-datepicker` (scoped package)
  - `pierre-react-datepicker`
  - `native-html5-datepicker`
  - etc.

### Versioning (Semantic Versioning)

- **MAJOR** (1.0.0 → 2.0.0) : Breaking changes
- **MINOR** (1.0.0 → 1.1.0) : Nouvelles fonctionnalités compatibles
- **PATCH** (1.0.0 → 1.0.1) : Bug fixes

### Fichiers publiés

Seuls ces fichiers seront publiés (voir `package.json` - "files") :
- `dist/` - Code compilé
- `README.md` - Documentation
- `LICENSE` - Licence
- `package.json` - Métadonnées

### Unpublish (Dépublication)

⚠️ Attention : npm ne permet de dépublier que dans les 72h suivant la publication !

```bash
npm unpublish simple-react-datepicker@1.0.0
```

## Utilisation après publication

Une fois publié, les utilisateurs peuvent l'installer :

```bash
npm install simple-react-datepicker
# ou
yarn add simple-react-datepicker
```

## Mises à jour

Pour publier une nouvelle version :

```bash
# 1. Faire vos modifications dans src/
# 2. Mettre à jour CHANGELOG.md
# 3. Bump version
npm version patch

# 4. Build
npm run build

# 5. Publish
npm publish
```

## Badges pour le README

Ajoutez ces badges à votre README après publication :

```markdown
![npm version](https://img.shields.io/npm/v/simple-react-datepicker.svg)
![npm downloads](https://img.shields.io/npm/dm/simple-react-datepicker.svg)
![license](https://img.shields.io/npm/l/simple-react-datepicker.svg)
```

## Support et maintenance

- Répondez aux issues GitHub
- Acceptez les Pull Requests
- Mettez à jour régulièrement les dépendances
- Testez avec les nouvelles versions de React

## Ressources

- [Documentation npm publish](https://docs.npmjs.com/cli/publish)
- [Semantic Versioning](https://semver.org/)
- [npm Package Best Practices](https://docs.npmjs.com/packages-and-modules)

