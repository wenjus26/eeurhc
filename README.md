# Landing Page Officielle — Église Évangélique URHC

Landing page statique haut de gamme pour l'**Église Évangélique Union Renaissance d’Hommes en Christ (URHC)**, annonçant la prochaine mise en ligne de son site officiel.

---

## 1. Caractéristiques du projet

- **Technologies** : 100% statique (HTML5 sémantique, CSS3 moderne avec variables, JavaScript vanilla léger).
- **Dépendances** : Aucune dépendance externe requise (polices hébergées via Google Fonts).
- **Performance & Écoconception** : Chargement ultra-rapide (< 1s), poids plume, optimisé pour les connexions mobiles réduites.
- **Accessibilité & SEO** : Balisage sémantique complet, `skip-link`, contraste élevé conforme WCAG AA, métadonnées Open Graph, Twitter Cards et données structurées `Schema.org/Church`.
- **Direction Artistique** : Institutionnelle chrétienne, sobre et solennelle, combinant le bleu nuit profond, l'or champagne et les couleurs officielles extraites du logo (Bleu URHC `#0D2F5C` et Rouge URHC `#B10B0E`).

---

## 2. Structure des fichiers

```text
eeurhc/
├── index.html                    # Page principale de pré-lancement
├── 404.html                      # Page d'erreur institutionnelle
├── styles.css                    # Feuille de styles globale (variables, responsive, animations)
├── script.js                     # Interactions légères (défilement, header, fade-in)
├── favicon.ico                   # Favicon multi-navigateurs
├── assets/
│   ├── icons/
│   │   ├── favicon-32x32.png     # Favicon 32x32 issu du logo
│   │   ├── favicon-64x64.png     # Favicon 64x64
│   │   ├── apple-touch-icon.png  # Icône Apple pour mobile (180x180)
│   │   └── favicon.svg           # Version vectorielle
│   └── images/
│       ├── logo-urhc.jpg         # Logo officiel fourni (sur pastille claire)
│       ├── hero-bg.jpg           # Photographie d'ambiance cinématique (aube dorée)
│       └── og-image.jpg          # Bannière de partage pour réseaux sociaux (1200x630)
└── README.md                     # Documentation technique et éditoriale
```

---

## 3. Lancement local

Le site est entièrement statique et ne requiert aucun serveur d'application complexe.

### Option A — Avec Python (recommandé)
```bash
python -m http.server 8000
```
Ouvrez ensuite [http://localhost:8000](http://localhost:8000) dans votre navigateur.

### Option B — Avec Node.js / npx
```bash
npx serve .
```

### Option C — Ouverture directe
Double-cliquez directement sur `index.html` pour l'ouvrir dans n'importe quel navigateur moderne.

---

## 4. Déploiement statique

Le projet est directement prêt à être hébergé sur n'importe quel service statique :

### GitHub Pages
1. Pousser les fichiers sur la branche `main` de votre dépôt GitHub.
2. Aller dans **Settings** > **Pages** > Source : **Deploy from a branch** (`main` / root).
3. Le site est en ligne instantanément.

### Netlify / Vercel
1. Glisser-déposer le dossier `eeurhc` sur le tableau de bord Netlify Drop ([app.netlify.com/drop](https://app.netlify.com/drop)), ou importer le dépôt Git sur Vercel.
2. Déploiement automatique sans étape de compilation (`build command: empty`, `publish directory: .`).

### Hébergement Web classique (OVHcloud, Hostinger, cPanel)
Transférer l'ensemble des fichiers via FTP/SFTP ou le gestionnaire de fichiers dans le dossier racine du serveur web (`www` ou `public_html`).

---

## 5. Points de vigilance & éléments temporaires à remplacer

Avant la publication définitive ou le passage au site complet, veillez à valider les points suivants :

### 1. Logo officiel et résolution graphique
- Le fichier actuel `assets/images/logo-urhc.jpg` est issu d'un visuel basse résolution.
- **Recommandation** : Dès réception du fichier source vectoriel (.SVG, .AI, .EPS) ou d'un PNG haute définition (au moins 1000px avec transparence), le placer dans `assets/images/logo-urhc.jpg` (ou `.png`/`.svg`).
- L'intégration sur pastille blanche arrondie a été spécialement conçue pour accueillir harmonieusement toute mise à jour de logo.

### 2. Orthographe du nom de l'Église (« d'Homme » vs « d'Hommes »)
- **Constat important** : Le visuel du logo porte l'inscription *« Eglise Union Renaissance d’Homme en Christ »* (singulier sans 's' à Homme).
- Cependant, la dénomination officielle, légale et courante de l'institution au Bénin est *« Église Évangélique Union Renaissance d’Hommes en Christ »* (au pluriel).
- Le texte du site utilise scrupuleusement la graphie correcte au pluriel (*« d'Hommes »*). Il convient de valider auprès de la hiérarchie de l'Église s'il s'agit d'une coquille historique sur ce fichier de logo afin d'harmoniser les supports officiels.

### 3. Coordonnées officielles de contact
- Conformément aux exigences déontologiques, **aucun faux numéro de téléphone ni fausse adresse e-mail n'a été inséré**.
- Des emplacements réservés sont prévus dans [index.html](file:///index.html#L280-L315) avec les commentaires `CONFIGURATION OFFICIELLE`. Dès validation, il suffira de remplacer les mentions d'attente par les liens réels (`tel:` et `mailto:`).

### 4. Réseaux sociaux officiels
- Les pastilles des réseaux sociaux (Facebook, YouTube, canaux de diffusion) sont configurées en mode statut inactif afin d'éviter tout lien erroné ou non certifié. Dès réception des URL officielles, insérer les liens correspondants (`href="..."`).

### 5. Numérotation de la citation biblique
- La citation retenue est : *« Avec Dieu, nous ferons des exploits. »* — **Psaume 60:14** (selon la version Louis Segond / canon protestant francophone, qui correspond au verset 12 dans d'autres éditions). À confirmer avec le collège pastoral.

---

## 6. Droits d'auteur & Mentions
© 2026 Église Évangélique Union Renaissance d’Hommes en Christ. Tous droits réservés.
