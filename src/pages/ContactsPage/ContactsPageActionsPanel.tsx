import { useState, useEffect, useTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import theme from 'jcicl/theme';
import Avatar from 'jcicl/Avatar';
import List from 'jcicl/List';
import ListButton from 'jcicl/ListButton';
import WithLabel from 'jcicl/WithLabel';
import ApiExample from 'src/api/ApiExample';

const apiExample = new ApiExample();

const boxShadow = `inset 0px -11px 6px -10px ${theme.colors.gold}, inset 0px 11px 6px -10px ${theme.colors.gold}`;

const ListButtonWithStyle = styled(ListButton)({
  '&:hover, :focus': {
    boxShadow,
  },
});

const ContactsPageActionsPanel = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<{ id: number; name: string }[]>([]);
  const [contactsLoading, fetchContacts] = useTransition();
  useEffect(() => {
    fetchContacts(async () => {
      const data = await apiExample.getContacts();
      setContacts(data);
    });
  }, []);

  return (
    <List bordered>
      {contacts.map(({ id, name }) => (
        <ListButtonWithStyle
          key={name}
          onClick={() => navigate(`/contacts/${id}`)}
          active={window.location.pathname.includes(`contacts/${id}`)}
          activeStyles={{ backgroundColor: theme.colors.sunlight, boxShadow }}
        >
          <WithLabel
            component={
              <Avatar
                avatarColor={id % 2 === 1 ? theme.colors.gold : undefined}
                backgroundColor={id % 2 === 1 ? theme.colors.sunlight : undefined}
              />
            }
            key={name}
            label={name}
          />
        </ListButtonWithStyle>
      ))}
    </List>
  );
};

export default ContactsPageActionsPanel;
