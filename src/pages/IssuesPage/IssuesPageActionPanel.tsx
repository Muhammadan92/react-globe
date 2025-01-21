import { useEffect, useState, useTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import Flex from 'jcicl/Flex';
import Icon from 'jcicl/Icon';
import List from 'jcicl/List';
import ListButton from 'jcicl/ListButton';
import WithLabel from 'jcicl/WithLabel';
import WithLoading from 'jcicl/WithLoading';
import ThunderstormOutlinedIcon from '@mui/icons-material/ThunderstormOutlined';
import ApiExample from 'src/api/ApiExample';
import { iconColors, backgroundColors } from 'src/constants';

const issuesApi = new ApiExample();

const IssuesPageActionsPanel = () => {
  const navigate = useNavigate();

  const [issues, setIssues] = useState<any>([]);

  // OLD: REACT 18
  // const [loading, setLoading] = useState(true);

  // NEW: REACT 19
  const [issuesLoading, loadIssues] = useTransition();

  useEffect(() => {
    // OLD: REACT 18
    // const fetchData = async () => {
    //   const data = await issuesApi.getIssues();
    //   if (!data.error) {
    //     // Simulate loading
    //     setIssues([]);
    //     setTimeout(() => setLoading(false), 1000);
    //     setIssues(data);
    //   } else {
    //     setIssues([]);
    //     setLoading(false);
    //     console.error('Error:', data.error);
    //   }
    // };
    // fetchData();

    // NEW: REACT 19
    loadIssues(async () => {
      const data = await issuesApi.getIssues();
      if (!data.error) {
        setIssues(data);
      } else {
        // TODO: Error Handling, empty state display
        setIssues([]);
        console.error('Error:', data.error);
      }
    });
  }, []);

  const handleClick = (id: string) => {
    localStorage.setItem('JCReactTemplateIssueId', id);
    navigate(`/issues/${id}`);
  };

  return (
    <Flex column width="100%" alignItems="center">
      <WithLoading loading={issuesLoading}>
        {issues.length === 0 && <div>No issues found</div>}
        {issues.length > 0 && (
          <List bordered width="calc(100% - 2px)">
            {issues?.map(({ id, description }: { id: number; description: string }) => (
              <ListButton
                key={id}
                onClick={() => handleClick(`${id}`)}
                active={window.location.pathname.includes(`issues/${id}`)}
              >
                <WithLabel
                  component={
                    <Icon
                      icon={<ThunderstormOutlinedIcon />}
                      iconColor={iconColors[id % 4]}
                      backgroundColor={backgroundColors[id % 4]}
                    />
                  }
                  label={description}
                />
              </ListButton>
            ))}
          </List>
        )}
      </WithLoading>
    </Flex>
  );
};

export default IssuesPageActionsPanel;
