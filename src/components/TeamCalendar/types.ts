export type TeamMeetingDetails = {
  shortName?: string;
  longName: string;
  icBadTeamId?: string;
  score?: number;
  isHost?: boolean;
};

export type ParsedMeeting = {
  date: Date;
  teamA: TeamMeetingDetails;
  teamB: TeamMeetingDetails;
};

export type Meeting = {
  date: string;
  teamA: TeamMeetingDetails;
  teamB: TeamMeetingDetails;
};
