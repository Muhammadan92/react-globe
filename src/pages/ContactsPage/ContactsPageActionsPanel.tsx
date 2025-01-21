import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import theme from 'jcicl/theme';
import Avatar from 'jcicl/Avatar';
import List from 'jcicl/List';
import ListButton from 'jcicl/ListButton';
import WithLabel from 'jcicl/WithLabel';
import { contacts } from 'src/.mockData/contacts';

const boxShadow = `inset 0px -11px 6px -10px ${theme.colors.gold}, inset 0px 11px 6px -10px ${theme.colors.gold}`;

const ListButtonWithStyle = styled(ListButton)({
  '&:hover, :focus': {
    boxShadow,
  },
});

const ContactsPageActionsPanel = () => {
  const navigate = useNavigate();

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
