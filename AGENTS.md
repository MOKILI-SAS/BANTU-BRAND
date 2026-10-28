# AGENTS.md — DIRECTIVES D'INGÉNIERIE BANTU BRAND (MOKILI FRAMEWORK)

Ce projet applique les principes fondamentaux de **MOKILI TECH CORE V1.0** et **MOKILI MASTER PROMPT V1.1**.

## Règles fondamentales

1. **Architecture & Stack :**
   - Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4.
   - Ne pas introduire de backend lourd ou de base de données relationnelle sans justification démontrée.
   - Le stockage est géré de manière atomique et modulaire via `src/lib/data-store.ts`.

2. **Sécurité :**
   - Aucun credential, clé API ou secret en dur dans le code.
   - Variables d'environnement définies dans `.env` et documentées dans `.env.example`.
   - `.env` ne doit JAMAIS être commité.

3. **Direction Artistique Bantu Brand :**
   - Palette : Bantu Terracotta (`#A62B17`), Bantu Ocre Gold (`#E06A00`), Ébène studio (`#0F0F12`), Lin chaud (`#FAF7F2`).
   - Signature visuelle : frise géométrique vectorielle Bantu (`BantuPattern.tsx`) issue de la charte officielle.
   - Imagerie : photographies authentiques d'Afrique contemporaine issues du projet.
   - Éviter absolument tout cliché folklorique : l'identité est africaine, contemporaine, créative et internationale.

4. **Mention Obligatoire Footer :**
   - Le footer doit afficher en permanence et de façon inaltérable la mention cliquable :
     `Propulsé par MOKILI` (lien vers `https://mokili.io`).

5. **Pilotage & Documentation :**
   - Maintenir à jour `PLAN.md` et `SUIVI.md` lors de chaque évolution majeure.
