---
templateKey: content-page
title: Transition des classements
heading: |-
  Transition des classements
  24-25 vers 25-26
---
À la rentrée 2025 - 2026 la FFBad introduit de nouvelles méthodes de calcul du CPPH. Elles permettront de mettre en place un système de classement linéaire à l'opposé de l'actuel exponentiel, pour stopper l'inflation des scores. À date du **04/09/2025**, les cotes des joueurs seront transférés vers ce nouveau système.

Cette page vous donnera les informations nécessaire pour comprendre comment la transition se fera. Pour plus d'infos concernant les nouvelles méthodes de calcul du CPPH, c'est [ici 👉 (Calcul des classements - 25-26)](/badminton/classements-25-26/calcul).

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

<customtables>{"type": "ELOTransitionRankingNew"}</customtables>

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

Afin de vous donner une idée de votre cote à la rentrée 2025, nous vous proposons un convertisseur de cote. Attention, les résultats de ce calculateur sont à titre indicatif et peuvent différer de la valeur finale lors de la conversion du 4 Septembre 2025. Les seuils utilisés pour les calculs sont ceux présentés [ici pour les nouveaux](#tableau-des-nouveaux-seuils) et [ici pour les anciens (actuels)](#annexe---tableau-des-seuils).

#### Convertisseur 

<elocoteconverter></elocoteconverter>

### Annexe - Tableau des seuils

<customtables>{"type": "ELOTransitionRankingOld"}</customtables>