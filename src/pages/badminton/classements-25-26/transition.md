---
templateKey: content-page
title: Transition des classements
heading: |-
  Transition des classements
  24-25 vers 25-26
---
À la rentrée 2025 - 2026, les méthodes de calcul du CPPH sont mises à jour pour intégrer un système de classement linéaire (actuellement exponentiel). À date du **04/09/2025**, les cotes des joueurs seront transférés vers ce nouveau système.

### Ajustements
Lors de la transition des points, les principes "d'insuffisance de résultats" et "d'ajustement annuel de l'inflation" du nouveau classement ne seront pas appliqués. Cependant, les principes de cote minimum 1 et 2 seront appliqués au préalable, avant changement d'échelle.

### Changement d'échelle des cotes
 
Le passage au nouveau classement consiste en un __changement d'intervalle de points__ par __discipline__ et par __sexe__. Pour passer d'un système à l'autre, on prend les anciens intervalles qui définissent les seuils des séries (N, R, D, P), et on les répartis dans les nouveaux.
 
Pour le bon calcul des valeurs suivantes, chaque valeur est liée à :

* une discipline
* un sexe
* une série

On définit les valeurs suivantes :

* $seuil_{OldMin}$ — minimum dans le classement actuel
* $seuil_{OldMax}$ — maximum dans le classement actuel
* $seuil_{NewMin}$ — minimum dans le nouveau classement
* $seuil_{NewMax}$ — maximum dans le nouveau classement

Les seuils du nouveau classement sont définis selon le tableau ci-dessous, les seuils du système actuel seront figés le jour de la transition.

#### Tableau des nouveaux seuils

|              | Max  | N1   | N2   | N3   | R4   | R5   | R6   | D7   | D8   | D9   | P10 | P11 | P12 |
|--------------|------|------|------|------|------|------|------|------|------|------|-----|-----|-----|
| Simple Dame  | 2400 | 2200 | 2000 | 1800 | 1600 | 1400 | 1200 | 1050 | 900  | 750  | 600 | 500 | 400 |
| Simple Homme | 2800 | 2600 | 2400 | 2200 | 2000 | 1800 | 1600 | 1400 | 1200 | 1000 | 800 | 600 | 400 |
| Double Dame  | 2400 | 2200 | 2000 | 1800 | 1600 | 1400 | 1200 | 1050 | 900  | 750  | 600 | 500 | 400 |
| Double Homme | 2800 | 2600 | 2400 | 2200 | 2000 | 1800 | 1600 | 1400 | 1200 | 1000 | 800 | 600 | 400 |
| Mixte Dame   | 2800 | 2600 | 2400 | 2200 | 2000 | 1800 | 1600 | 1400 | 1200 | 1000 | 800 | 600 | 400 |
| Mixte Homme  | 2800 | 2600 | 2400 | 2200 | 2000 | 1800 | 1600 | 1400 | 1200 | 1000 | 800 | 600 | 400 |

<sub>Dans le cas d'un joueur N1 qui fait parti du top BWF, les cotes après transition peuvent dépasser les max, et peuvent aller jusqu'à 4000 points.</sub>

#### Formule de conversion

Pour chaque cote, on applique la formule suivante :

$$
\begin{align*}
ecartSeuil_{New}& = seuil_{NewMax} - seuil_{NewMin} \\
ecartSeuil_{Old}& = seuil_{OldMax} - seuil_{OldMin} \\
cote_{New}& = ecartSeuil_{New} * \log_{2} \left(1 + \frac{cote_{Old} - seuil_{OldMin}}{ecartSeuil_{Old}}\right) + seuil_{NewMin}
\end{align*}
$$

### Example

Appliqué à un joueur (homme) R4 avec 300 points en DH, le classement R4 en DH est fixé de 248.03 à 490.87 points (seuils non mis à jour, se référer à [l'annexe](#annexe---tableau-des-seuils) pour des valeurs à jour), ce qui donne les valeurs suivantes :

$$
\begin{align*}
cote_{Old}& = 300 \\
seuil_{NewMax}& = 2200 \\
seuil_{NewMin}& = 2000 \\
seuil_{OldMax}& = 490.87 \\
seuil_{OldMin}& = 248.03 \\
ecartSeuil_{New}& = 2200 - 2000 \\
&= 200 \\
ecartSeuil_{Old}& = 490.87 - 248.03 \\
&= 242.84 \\
cote_{New}& = 200 * \log_{2} \left(1 + \frac{300 - 248.03}{242.84}\right) + 2000 \\
&\approx 2056
\end{align*}
$$

Dans le nouveau classement il aura donc $2056$ points.

### Outil de conversion de cote

Afin de vous donner une idée de votre cote à la rentrée 2025, nous vous proposons un convertisseur de cote. Attention, les résultats de ce calculateur sont à titre indicatif et peuvent différer de la valeur finale lors de la conversion du 4 Septembre 2025.

#### Convertisseur 

<elocoteconverter></elocoteconverter>

### Annexe - Tableau des seuils
##### Mis à jour le 17/04/2025
|              | N1       | N2      | N3      | R4      | R5     | R6     | D7     | D8    | D9    | P10  | P11  | P12  |
|--------------|----------|---------|---------|---------|--------|--------|--------|-------|-------|------|------|------|
| Simple Dame  | 7609.50  | 3442.24 | 1214.45 | 653.08  | 326.69 | 135.25 | 56.10  | 21.93 | 8.15  | 3.74 | 0.51 | 0.00 |
| Simple Homme | 3550.10  | 1176.74 | 428.71  | 211.83  | 95.43  | 41.64  | 21.65  | 12.48 | 6.86  | 3.16 | 0.49 | 0.00 |
| Double Dame  | 12155.85 | 7170.28 | 3465.65 | 1861.15 | 896.12 | 355.66 | 136.67 | 43.43 | 10.56 | 5.06 | 0.48 | 0.00 |
| Double Homme | 2717.38  | 1131.63 | 502.68  | 261.84  | 123.02 | 52.97  | 25.35  | 13.79 | 7.67  | 3.31 | 0.39 | 0.00 |
| Mixte Dame   | 3952.16  | 2092.15 | 993.86  | 515.65  | 228.97 | 82.34  | 31.96  | 13.49 | 5.81  | 2.41 | 0.33 | 0.00 |
| Mixte Homme  | 3952.16  | 2092.15 | 993.86  | 515.65  | 228.97 | 82.34  | 31.96  | 13.49 | 5.81  | 2.41 | 0.33 | 0.00 |