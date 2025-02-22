import Flex from 'jci18/Flex';
import ZoomEntrance from 'jci18/animation/ZoomEntrance';

const NotFoundPage: React.FC = () => {
  return (
    <Flex column width="100%" alignItems="center">
      <ZoomEntrance>
        <h1>We're sorry, there's nothing here. Please try a different URL :)</h1>
      </ZoomEntrance>
    </Flex>
  );
};

export default NotFoundPage;
