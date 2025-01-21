import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AppContainer from 'jcicl/AppContainer';
import ErrorBoundary from 'jcicl/ErrorBoundary';
// Nav
import { NavItemProps as JCINavItemProps } from 'jcicl/Nav';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ContactsIcon from '@mui/icons-material/Contacts';
import ContactsPageActionsPanel from 'pages/ContactsPage/ContactsPageActionsPanel';
// Custom redirect
import ApiExample from 'src/api/ApiExample';
const issuesApi = new ApiExample();

interface NavItemProps extends JCINavItemProps {
  url: string;
}

function App() {
  const [actionsPanelElement, setActionsPanelElement] = useState<React.ReactNode | undefined>(undefined);
  const [activeRoute, setActiveRoute] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const navItemsBase: NavItemProps[] = [
    {
      label: 'Home',
      icon: <HomeIcon />,
      url: '/',
    },
    {
      label: 'Contacts',
      icon: <ContactsIcon />,
      url: '/contacts',
      actionsPanelContent: <ContactsPageActionsPanel />,
    },
  ];

  const navItems = navItemsBase.map((navItem) => {
    return {
      onClick: () => {
        const { actionsPanelContent, url, label } = navItem;
        setActiveRoute(label);
        setActionsPanelElement(actionsPanelContent);
        navigate(url);
      },
      // Because the object is spread after the onClick, we can override previously outlined default with a custom specification in the navItemsBase array
      ...navItem,
    };
  });

  useEffect(() => {
    navItems.forEach(({ url, label, actionsPanelContent }) => {
      if (window.location.pathname.includes(url)) {
        setActiveRoute(label);
        setActionsPanelElement(actionsPanelContent);
      }
    });
  }, []);

  return (
    <AppContainer navProps={{ navItems, activeRoute }} actionsPanelContent={actionsPanelElement}>
      <ErrorBoundary title="We seem to have enountered an error, our apologies.">
        <Outlet />
      </ErrorBoundary>
    </AppContainer>
  );
}

export default App;
