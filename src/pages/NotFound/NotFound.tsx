import Flex from 'jcicl/Flex';
import ZoomEntrance from 'jcicl/animation/ZoomEntrance';
import LogoLoop from 'jcicl/LogoLoop';

const NotFoundPage: React.FC = () => {
  return (
    <Flex column width="100%" alignItems="center">
      <LogoLoop />
      <ZoomEntrance>
        <h1>We're sorry, there's nothing here. Please try a different URL :)</h1>
      </ZoomEntrance>
    </Flex>
  );
};

export default NotFoundPage;
