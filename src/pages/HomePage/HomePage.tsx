import { useState } from 'react';
import LogoLoop from 'jcicl/LogoLoop';
import Button from 'jcicl/Button';
import Flex from 'jcicl/Flex';

const HomePage = () => {
  const [count, setCount] = useState(0);
  return (
    <Flex column width="100%" alignItems="center">
      <LogoLoop />
      <h1>Home Page</h1>
      <Flex styles={{ marginTop: '2rem' }}>
        <Button onClick={() => setCount((count) => count + 1)}>count is {count}</Button>
      </Flex>
    </Flex>
  );
};

export default HomePage;
