# BANTU BRAND — SITE WEB MÉDIA & PODCAST CRÉATIF AFRICAIN

> **Site officiel Bantu Brand** — Conçu et développé selon le **Framework MOKILI** (Architecture & Gouvernance V1.1).

---

## 1. Présentation du Projet

**Bantu Brand** est un média podcast créatif africain et un studio de conseil en communication de marque fondé à Kinshasa par **Doris Kabemba**.

Le média donne une voix, une visibilité et un espace aux créatifs africains, en célébrant :
- Leur culture et leurs récits sans folklore ni cliché ;
- Leurs parcours, créations, collections et innovations ;
- Leurs marques et visions contemporaines.

Au-delà de sa mission éditoriale, **Bantu Brand Studio** accompagne les entreprises et créateurs à travers deux offres commerciales majeures :
1. **Consultance en communication** (stratégie de marque, positionnement culturel, storytelling africain, conseil exécutif) ;
2. **Accompagnement en communication** (immersion continue, production photo/vidéo/podcast, community management, activations publicitaires).

---

## 2. Architecture Technique & Fonctionnalités

Le projet respecte l'intégralité des standards du **Framework MOKILI** :

- **Framework** : Next.js 16.3.5 (App Router, Turbopack, React 19, TypeScript)
- **Styling** : Tailwind CSS v4 avec design system Bantu Brand (Terracotta `#A62B17`, Or ocre `#E06A00`, Ébène studio `#0D0D11`, Crème `#FAF7F2`) et motif vectoriel géométrique authentique (`BantuPattern`)
- **Grand Lecteur Podcast Hero** :
  - Lecteur média immersif dominant la Hero section
  - Commutateur dynamique Mode Vidéo / Mode Studio Audio
  - Contrôles interactifs (Play, Pause, Partage, lien direct YouTube)
  - Connexion directe au catalogue : cliquer sur n'importe quel épisode de la bibliothèque le charge instantanément dans le Grand Lecteur
- **Dashboard d'Administration (`/dashboard`)** :
  - **Gestion des épisodes** : Renseigner simplement un lien YouTube -> Le système extrait automatiquement la vidéo, le titre, la miniature et la description via l'API oEmbed
  - **Mise en avant Hero** : 1-clic pour définir n'importe quel épisode en vedette dans le Grand Lecteur du site
  - **Gestion du Showcase Créatifs & Projets** : Ajout, modification, association d'images HD issues du dossier officiel
  - **Services & Paramètres** : Modification des coordonnées de contact et liens réseaux sociaux
  - **Boîte de Réception** : Consultation des demandes soumises via le formulaire tri-profils
- **Parcours de Conversion Tri-Profils** :
  - Profil 1 : *Créatif Africain* (proposer un projet, demander une interview)
  - Profil 2 : *Marque / Entreprise* (demander une consultance ou un accompagnement)
  - Profil 3 : *Auditeur* (rejoindre la communauté, suggérer un invité)
- **SEO & Accessibilité** :
  - Métadonnées OpenGraph & Twitter Cards
  - Données structurées Schema.org JSON-LD (`PodcastSeries`, `Organization`)
  - `sitemap.xml` et `robots.txt` dynamiques
- **Attribution MOKILI** :
  - Mention permanente et cliquable dans le footer : **« Propulsé par [MOKILI](https://mokili.io) »**.

---

## 3. Installation et Lancement

### Prérequis
- Node.js 18+ ou 20+
- npm ou pnpm

### Commandes

```bash
# Se placer dans le répertoire du projet
cd bantu-site

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Compiler pour la production
npm run build

# Lancer la version de production
npm run start
```

Le site est accessible sur : `http://localhost:3000`  
Le dashboard d'administration est accessible sur : `http://localhost:3000/dashboard`

---

## 4. Variables d'Environnement (`.env`)

Conformément à la règle de sécurité MOKILI (Zero Secret Policy), le fichier `.env` n'est jamais poussé sur GitHub. Un fichier `.env.example` est fourni comme gabarit :

```env
NEXT_PUBLIC_SITE_URL=https://bantubrand.com
MOKILI_URL=https://mokili.io
YOUTUBE_API_KEY=
DASHBOARD_ACCESS_PIN=2026
```

---

## 5. Gouvernance MOKILI

- `MOKILI-PROJECT-SPEC.md` : Spécifications fonctionnelles et techniques complètes (Profils P03, P01, P04, P14)
- `PLAN.md` : Feuille de route et découpage des 6 lots
- `SUIVI.md` : Journal de bord d'exécution et indicateurs qualité
- `AGENTS.md` : Directives de contribution et conventions de code

---

*Propulsé par [MOKILI](https://mokili.io) — Kinshasa, RDC.*
