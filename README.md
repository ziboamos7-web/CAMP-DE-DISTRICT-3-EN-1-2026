# Camp de District 3 en 1

Application web mobile du **Camp de District 3 en 1** (Bouaflé, 2026) : pré-inscription, ticket, informations du camp, fil d'actualité et championnat.

Le camp se déroule du **28 octobre au 2 novembre 2026**.

## Fonctionnalités

- **Compte participant** : création de compte et connexion par e-mail et mot de passe à 8 chiffres, avec vérification de l'e-mail par code. Le compte fonctionne sur tous les appareils.
- **Pré-inscription en 4 étapes** : identité, parcours, mission, ticket. Le tarif suggéré dépend du titre (Chef : 8 000 F CFA, Élément : 7 000 F CFA).
- **Mon ticket** : ticket personnel avec numéro unique par district (`CAM-DP-2026-0001`…).
- **Paiement par Wave** : envoi du nom du compte, du numéro et de la preuve de paiement, puis validation par l'organisation.
- **Mon Camp** : compte à rebours, liste de préparation du sac, récapitulatif du camp.
- **Fil d'actualité** : publications, photos, mobilisation des troupes, présentation de l'orateur du camp.
- **Championnat CUFLB** (Coupe d'Unité Flambeaux-Lumières de Bouaflé) : poules, calendrier, résultats, fiches de match, favoris.
- **Licence de joueur** : parcours d'inscription et envoi de la licence remplie.

## Technique

- Application **monopage** : un seul fichier HTML (HTML, CSS et JavaScript), sans framework ni étape de build.
- Pensée pour smartphone.
- **Backend : Supabase** (authentification, base PostgreSQL, stockage des fichiers).
  - `backend/supabase_schema.sql` : tables, sécurité par ligne (RLS), stockage privé des photos et des preuves, vue d'administration.
  - `backend/camp-backend.js` : client JavaScript qui relie l'application à Supabase.

## Mise en route

1. Créer un projet sur [supabase.com](https://supabase.com).
2. Dans *Authentication → Providers → Email*, désactiver « Confirm email ».
3. Exécuter dans le SQL Editor, dans cet ordre : `backend/supabase_schema.sql`, puis `backend/migration_01.sql`.
4. Renseigner `SUPABASE_URL` et `SUPABASE_ANON_KEY` en tête de `backend/camp-backend.js` (déjà intégré en bas de `index.html`).
5. Se connecter une première fois, puis se déclarer administrateur :
   ```sql
   insert into public.admins values ('<user_id>');
   ```
6. Héberger le fichier `index.html` (Netlify, Cloudflare Pages ou GitHub Pages).

## Sécurité

- Utiliser uniquement la clé **anon** côté application. Ne jamais publier la clé `service_role`.
- Chaque participant n'accède qu'à ses propres données ; seuls les administrateurs voient l'ensemble des inscrits et des paiements.

## Structure

```
index.html              application
backend/
  supabase_schema.sql   schéma de la base
  migration_01.sql      format des tickets, numéros de téléphone
  camp-backend.js       client Supabase (aussi intégré dans index.html)
```
