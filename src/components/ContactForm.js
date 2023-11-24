import React, {useState} from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
} from '@chakra-ui/react';

const subjects = [
  {
    key: 'general',
    label: 'Question générale',
    emailSubject: '[Général]',
    email: 'club.badml@gmail.com',
  },
  {
    key: 'admin',
    label: 'Question administrative',
    emailSubject: '[Administratif]',
    email: 'secretaire.badml@gmail.com',
  },
  {
    key: 'coach',
    label: 'Question à la direction du coach',
    emailSubject: '[Coach]',
    email: 'coach.badml@gmail.com',
  },
  {
    key: 'jeu-libre',
    label: 'Question sur le jeu libre et la section loisirs',
    emailSubject: '[Loisirs]',
    email: 'loisirs.badml@gmail.com',
  },
  {
    key: 'competitions',
    label: 'Question sur la section compétiteurs',
    emailSubject: '[Compétition]',
    email: 'competition.badml@gmail.com',
  },
  {
    key: 'autre',
    label: 'Autre...',
    email: 'club.badml@gmail.com',
  },
];

const ContactForm = () => {
  const [subject, setSubject] = useState(null);
  const [extendedSubject, setExtendedSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubjectChange = e => {
    setSubject(subjects.find(s => s.key === e.target.value));
  };

  const handleExtendedSubjectChange = e => {
    setExtendedSubject(e.target.value);
  };

  const handleMessageChange = e => {
    setMessage(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const subjectText =
      subject.key === 'autre'
        ? extendedSubject
        : `${subject.emailSubject} ${extendedSubject}`;
    window.open(
      `mailto:${subject.email}?subject=${subjectText}&body=${message.replaceAll(
        '\n',
        '%0D%0A'
      )}`,
      'mail'
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-6">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <FormControl isRequired={true}>
              <FormLabel htmlFor="subject">Sujet de la demande</FormLabel>
              <Select
                id="subject"
                placeholder="Sélectionner le sujet de votre demande"
                value={subject?.key || ''}
                onChange={handleSubjectChange}
              >
                {subjects.map(subject => (
                  <option key={subject.key} value={subject.key}>
                    {subject.label}
                  </option>
                ))}
              </Select>
            </FormControl>
          </div>

          {subject && (
            <div className="col-span-6">
              <FormControl isRequired={true}>
                <FormLabel htmlFor="other-subject">
                  Titre de la demande
                </FormLabel>
                <Input
                  id="other-subject"
                  value={extendedSubject}
                  onChange={handleExtendedSubjectChange}
                />
              </FormControl>
            </div>
          )}

          <div className="col-span-6">
            <FormControl isRequired={true}>
              <FormLabel htmlFor="message">Message</FormLabel>
              <Textarea
                id="message"
                value={message}
                onChange={handleMessageChange}
                rows={5}
              />
            </FormControl>
          </div>
        </div>
      </div>

      <div className="mt-2 py-3 text-right">
        <Button
          colorScheme="blue"
          type="submit"
          size="md"
          disabled={!subject || !extendedSubject || !message}
        >
          Envoyer
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
