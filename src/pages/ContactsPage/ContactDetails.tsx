import { useState, useEffect, useTransition } from 'react';
import { useParams } from 'react-router-dom';
import Flex from 'jcicl/Flex';
import ZoomEntrance from 'jcicl/animation/ZoomEntrance';
import LogoLoop from 'jcicl/LogoLoop';
import ApiExample from 'src/api/ApiExample';

const apiExample = new ApiExample();

const ContactDetailsPage: React.FC = () => {
  const [contacts, setContacts] = useState<{ id: number; name: string }[]>([]);
  const [contactsLoading, fetchContacts] = useTransition();

  const { id } = useParams();
  const { name } = contacts.find((contact) => `${contact.id}` === id) || {};

  useEffect(() => {
    fetchContacts(async () => {
      const data = await apiExample.getContacts();
      setContacts(data);
    });
  }, []);

  return (
    <Flex column width="100%" alignItems="center">
      <LogoLoop />
      <ZoomEntrance>
        <h1>{name}</h1>
      </ZoomEntrance>
    </Flex>
  );
};

export default ContactDetailsPage;
