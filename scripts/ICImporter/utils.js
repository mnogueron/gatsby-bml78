import * as dateFns from 'date-fns';

export const parseICDate = date =>
  dateFns.parse(date, 'dd/MM/yyyy HH:mm', new Date());

export const getICsToImport = (icMetas, date) => {
  const dateRef = date || new Date();
  return icMetas.teams.map(({id, ics}) => ({
    id,
    ics: ics.filter(
      ic => !ic.parsed && dateFns.isBefore(parseICDate(ic.date), dateRef)
    ),
  }));
};
