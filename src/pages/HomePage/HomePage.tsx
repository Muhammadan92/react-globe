import { useState } from 'react';
import Flex from 'jcicl/Flex';

const HomePage = () => {
  const [count, setCount] = useState(0);
  return (
    <Flex column width="100%" alignItems="center">
      <h1>Home Page</h1>
    </Flex>
  );
};

export default HomePage;
