export const template = ({
  teamNumber,
  hostClubName,
  guestClubName,
  date,
  assetURL,
  meetingNumber,
  teamScore,
  matches,
  shortSeason,
}) => `---
templateKey: result-page
title: interclub-equipe-${teamNumber}
cardTitle: Saison ${shortSeason} - Équipe ${teamNumber} - ${hostClubName} vs ${guestClubName} 
heading: |-
  Saison ${shortSeason} - Équipe ${teamNumber}
  ${hostClubName} vs ${guestClubName}
date: ${date}
category: equipe-${teamNumber}-s${shortSeason}
featuredimage:
  image: ${assetURL || '/assets/shuttle.jpg'}
---
${assetURL ? `![](${assetURL} "BML${teamNumber} - J${meetingNumber}")` : ''}

<teamscoreboard>${JSON.stringify({teamScore})}</teamscoreboard>

<scoreboard>${JSON.stringify({matches})}</scoreboard>`;
