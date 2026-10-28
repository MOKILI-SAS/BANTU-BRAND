# PLAN DE DÉVELOPPEMENT — BANTU BRAND

**Projet :** Bantu Brand  
**Standard :** MOKILI MASTER PROMPT V1.1 & MOKILI TECH CORE V1.0  
**Statut :** Achevé & Validé (Build 100% OK)  

---

## Lots de Travail

### Lot 1 : Cadrage, Infrastructure & Configuration MOKILI
- [x] Découverte du framework MOKILI (`.mokili/config`, `MOKILI TECH CORE.md`, `MOKILI MASTER PROMPT V1.1`)
- [x] Analyse documentaire du PDF officiel (`BANTU BRAND_PRESENTATION.pdf`) et extraction des assets
- [x] Intégration des photographies haute définition et logo officiel dans `public/images/`
- [x] Initialisation des fichiers de gouvernance MOKILI (`MOKILI-PROJECT-SPEC.md`, `PLAN.md`, `SUIVI.md`, `AGENTS.md`)
- [x] Configuration environnement et sécurité (`.env.example`, `.env`, `.gitignore`)

### Lot 2 : Modèle de Données & Moteur API YouTube
- [x] Définition des types TypeScript (`Episode`, `CreativeProject`, `ServiceOffer`, `MessageInquiry`)
- [x] Création du store persistant (`src/data/bantu-store.json`) avec données authentiques
- [x] Implémentation du résolveur d'URL YouTube et fetcher oEmbed (`src/lib/youtube.ts`)
- [x] Routes API REST :
  - [x] `/api/episodes` (CRUD épisodes podcast)
  - [x] `/api/creatives` (CRUD créatifs & projets)
  - [x] `/api/services` (Gestion des offres)
  - [x] `/api/messages` (Réception des candidatures / devis)
  - [x] `/api/youtube-meta` (Extraction automatique de métadonnées vidéo)

### Lot 3 : Direction Artistique & Design System Bantu
- [x] Palette chromatique exacte (Terracotta `#A62B17`, Ocre solaire `#E06A00`, Ébène profond `#0D0D11`, Crème `#FAF7F2`)
- [x] Frise géométrique vectorielle SVG Bantu Brand (`BantuPattern.tsx`)
- [x] Typographie et hiérarchie visuelle contemporaine

### Lot 4 : Interface Publique & Composants Clés
- [x] Header / Navigation responsive avec logo et drawer mobile (`Navbar.tsx`)
- [x] Hero Section avec Grand Podcast Player immersif (`HeroPlayer.tsx`) :
  - [x] Lecteur vidéo YouTube intégré (Iframe API)
  - [x] Mode vidéo / Mode studio audio
  - [x] Contrôles interactifs Play/Pause, Partage, lien YouTube
  - [x] Fallback et gestion d'erreurs
- [x] Section 2 : Présentation Bantu Brand, Manifeste de Doris Kabemba, Piliers & Chiffres (`AboutSection.tsx`)
- [x] Section 3 : Podcast & Grille d'épisodes avec filtres et lecture instantanée (`PodcastSection.tsx`)
- [x] Section 4 : Créatifs & Projets (Showcase haute couture, streetwear, artisanat, campagnes) (`CreativesSection.tsx`)
- [x] Section 5 : Offres commerciales (Consultance & Accompagnement en communication) (`ServicesSection.tsx`)
- [x] Section 6 : Conversion tri-profils & Formulaire interactif (`ConversionSection.tsx`)
- [x] Section 7 : Footer MOKILI obligatoire avec lien cliquable permanent (`Footer.tsx`)

### Lot 5 : Dashboard d'Administration
- [x] Interface moderne d'administration `/dashboard` (`src/app/dashboard/page.tsx`)
- [x] Gestionnaire d'épisodes avec import YouTube en 1 clic
- [x] Gestionnaire de créatifs et projets
- [x] Gestionnaire des services et coordonnées
- [x] Boîte de réception des messages

### Lot 6 : SEO, Responsive & Assurance Qualité
- [x] Métadonnées OpenGraph, Twitter Cards et Schema.org JSON-LD (`src/app/layout.tsx`)
- [x] Sitemap (`sitemap.ts`) et Robots (`robots.ts`)
- [x] Tests de compilation Next.js Turbopack (`npm.cmd run build` -> 0 erreur)
- [x] Validation responsive mobile, tablette et desktop
