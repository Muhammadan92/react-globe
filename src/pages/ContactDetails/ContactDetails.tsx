import { useParams } from 'react-router-dom';
import Flex from 'jcicl/Flex';
import ZoomEntrance from 'jcicl/animation/ZoomEntrance';
import LogoLoop from 'jcicl/LogoLoop';
import { contacts } from 'src/.mockData/contacts';

const ContactDetailsPage: React.FC = () => {
  const { id } = useParams();
  const { name } = contacts.find((contact) => `${contact.id}` === id) || {};

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
