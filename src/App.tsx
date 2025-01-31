import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AppContainer from 'jci18/AppContainer';
import ErrorBoundary from 'jci18/ErrorBoundary';
// Nav
import { NavItemProps as JCINavItemProps } from 'jci18/Nav';
import { useNavigate } from 'react-router-dom';
import Globe from '@mui/icons-material/Public';
import theme from 'jci18/theme';
import logo from 'assets/logo.webp';

interface NavItemProps extends JCINavItemProps {
  url: string;
}

const customTheme = {
  backgroundPrimary: theme.colors.sky,
  backgroundSecondary: theme.colors.lovemist,
  backgroundTertiary: theme.colors.cornflower,
  borderPrimary: theme.colors.darkBlue,
  shadowPrimary: theme.colors.indigo,
  iconPrimary: theme.colors.cobalt,
};

function App() {
  const [actionsPanelElement, setActionsPanelElement] = useState<React.ReactNode | undefined>(undefined);
  const [activeRoute, setActiveRoute] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const navItemsBase: NavItemProps[] = [
    {
      label: 'Home',
      icon: <Globe />,
      url: '/',
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
    // <AppContainer navProps={{ navItems, activeRoute }} actionsPanelContent={actionsPanelElement} themeColors={customTheme} logoProps={{ logoSrc: logo, logoWidth: 50 }}>
    //   <ErrorBoundary title="We seem to have enountered an error, our apologies.">
    <Outlet />
    //   </ErrorBoundary>
    // </AppContainer>
  );
}

export default App;
