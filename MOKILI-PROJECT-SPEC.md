# MOKILI-PROJECT-SPEC — BANTU BRAND

**Projet :** Bantu Brand  
**Organisation :** MOKILI SAS / Bantu Brand  
**Version :** 1.0  
**Date :** 11 septembre 2026  
**Statut :** Spécification technique et produit validée  
**Cadre :** MOKILI TECH CORE V1.0 & MOKILI MASTER PROMPT V1.1  

---

## 1. Vision et Objectif du Produit

Bantu Brand est un média podcast créatif africain à vocation internationale fondé par Doris Kabemba (graphiste, photographe et communicant congolais).
Le média donne une voix, une visibilité et un espace aux créatifs africains, tout en monétisant son expertise à travers deux offres commerciales de haut niveau :
1. Consultance en communication stratégique
2. Accompagnement en communication opérationnelle

Le site officiel est conçu pour allier l'excellence éditoriale d'un grand média contemporain avec la puissance commerciale d'un studio de conseil de premier plan.

---

## 2. Profils MOKILI Actifs

| Code | Profil | Rôle |
|---|---|---|
| **P03** | Média / Publication | Profil primaire : podcast player immersif, épisodes, invités, catégories |
| **P01** | Site Vitrine / Landing Page | Expérience d'accueil percutante, conversion, storytelling |
| **P04** | Site d'Entreprise / Services | Présentation détaillée des 2 offres commerciales |
| **P14** | Dashboard / Back-office | Administration sans code : ajout d'épisode via lien YouTube, gestion des créatifs et services |

---

## 3. Architecture Technique

- **Niveau d'architecture :** Niveau B/C (Frontend moderne SSR/SSG + API routes Next.js avec persistance structurée JSON)
- **Frontend :** Next.js 16.3.5 (App Router, Turbopack), React 19.2.8, TypeScript 5, Tailwind CSS v4, Lucide React
- **Backend / API :** Route Handlers Next.js (`/api/episodes`, `/api/creatives`, `/api/services`, `/api/messages`, `/api/youtube-meta`)
- **Stockage :** Fichier JSON atomique `src/data/bantu-store.json` avec fallback initial et persistance instantanée
- **Intégrations Externes :** YouTube Iframe API & YouTube oEmbed pour la synchronisation automatique des épisodes et miniatures sans clé obligatoire

---

## 4. Direction Artistique & Charte

- **Palette chromatique :**
  - Bantu Terracotta (`#A62B17`, `#BA341D`)
  - Bantu Ochre Gold (`#E06A00`, `#D97706`, `#F59E0B`)
  - Bantu Deep Ebony (`#0F0F12`, `#16161C`)
  - Bantu Cream Sand (`#FAF7F2`, `#F3EDE2`)
- **Pattern traditionnel :** Frise géométrique Bantu vectorielle issue des 12 slides du document officiel de référence
- **Ressources photographiques :** 17 photographies haute définition fournies dans le projet (aucune ressource générique décontextualisée)

---

## 5. Exigences Obligatoires

- [x] Grand Podcast Player Hero avec intégration YouTube administrable
- [x] Récupération automatique du titre, miniature et infos par simple lien YouTube
- [x] Section Bantu Brand (Manifeste, Doris Kabemba, mission, valeurs)
- [x] Section Médias / Épisodes avec filtres et lecture instantanée
- [x] Section Créatifs & Projets valorisant les ressources fournies
- [x] Section Services : Consultance & Accompagnement
- [x] Parcours tri-profils (Créatif / Auditeur / Marque)
- [x] Dashboard d'administration ergonomique
- [x] SEO complet (OpenGraph, Twitter Cards, balises Schema.org, robots, sitemap)
- [x] Mobile-first et responsive irréprochable
- [x] Footer obligatoire « Propulsé par MOKILI » avec lien cliquable
