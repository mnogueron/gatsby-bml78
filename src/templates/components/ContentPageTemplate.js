import React from 'react';
import Header from '../../components/Header';
import Content from '../../components/Content';
import { Container, SectionHeading } from '../../components/Sections';
import Image from '../../components/Image';
import Scoreboard from '../../components/Scoreboard';

function ContentPageTemplate({ heading, subheading, html, team }) {
  return (
    <>
      <Header heading={heading} subheading={subheading} />
      <Scoreboard
        matches={[
          {
            teamA: {
              players: [
                { name: 'Matthieu Nogueron', ranking: 'NC', club: 'BML78' },
                { name: 'Reatha Tith', ranking: 'NC', club: 'BML78' },
              ],
            },
            teamB: {
              players: [
                { name: 'Marc Simon', ranking: 'NC', club: 'BML78' },
                { name: 'Yi', ranking: 'NC', club: 'BML78' },
              ],
            },
            score: {
              set: [
                { scoreA: 21, scoreB: 19 },
                { scoreA: 10, scoreB: 21 },
                { scoreA: 21, scoreB: 12 },
              ],
            },
          },
        ]}
      />
      <Scoreboard
        matches={[
          {
            teamA: {
              players: [
                { name: 'Matthieu Nogueron', ranking: 'P12', club: 'BML78' },
                { name: 'Reatha Tith', ranking: 'D9', club: 'BML78' },
              ],
            },
            teamB: {
              players: [
                { name: 'Marc Simon', ranking: 'R6', club: 'BML78' },
                { name: 'Yi', ranking: 'N2', club: 'BML78' },
              ],
            },
            score: {
              set: [
                { scoreA: 21, scoreB: 19 },
                { scoreA: 10, scoreB: 21 },
                { scoreA: 21, scoreB: 12 },
              ],
            },
          },
        ]}
        hideHeader
      />
      <Scoreboard
        matches={[
          {
            teamA: {
              players: [
                { name: 'Matthieu Nogueron', ranking: 'NC', club: 'BML78' },
                { name: 'Reatha Tith', ranking: 'NC', club: 'BML78' },
              ],
            },
            teamB: {
              players: [
                { name: 'Marc Simon', ranking: 'NC', club: 'BML78' },
                { name: 'Yi', ranking: 'NC', club: 'BML78' },
              ],
            },
            score: {
              set: [
                { scoreA: 21, scoreB: 19 },
                { scoreA: 10, scoreB: 21 },
                { scoreA: 21, scoreB: 12 },
              ],
            },
          },
        ]}
        hideHeader
      />
      <Content html={html} />
      {team && (
        <Container>
          <div className="max-w-3xl mx-auto">
            <SectionHeading>Our team</SectionHeading>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {team.map((member, idx) => {
                return (
                  <div key={idx}>
                    <Image
                      className="rounded"
                      image={member.image}
                      alt={member.name}
                    />
                    <p className="mt-2 text-gray-800 font-semibold">
                      {member.name}
                    </p>
                    <p className="mt-0 text-green-700">{member.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

export default ContentPageTemplate;
