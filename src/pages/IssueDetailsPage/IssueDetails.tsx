import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import BoltIcon from '@mui/icons-material/Bolt';
import ThunderstormOutlinedIcon from '@mui/icons-material/ThunderstormOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import Flex from 'jcicl/Flex';
import Icon from 'jcicl/Icon';
import EditableInfoCard from 'jcicl/EditableInfoCard';
import WithLabel from 'jcicl/WithLabel';
import { LabeledValueProps } from 'jcicl/LabeledValue';
import ApiExample, { IssueDetailsInterface, emptyIssueDetails } from 'src/api/ApiExample';
import { iconColors, backgroundColors, shadows } from 'src/constants';

const issuesApi = new ApiExample();

const replaceRegex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;
const constructData = (key: string, details: Partial<IssueDetailsInterface>): LabeledValueProps => {
  return {
    label: key.replace(replaceRegex, '$1$4 $2$3$5'),
    value: `${details[key as keyof IssueDetailsInterface] ?? ''}`,
  };
};

const CardContainer = styled('div')`
  max-width: 1600px;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 64px;
  padding: 0 2rem 2rem 2rem;
  box-sizing: border-box;
`;

const PreTitle = styled('h3')`
  margin-right: 0.5rem;
`;

const IssueDetailsPage: React.FC = () => {
  const { id } = useParams();
  const numericId = Number(id);
  const [issueDetails, setIssueDetails] = useState<IssueDetailsInterface>(emptyIssueDetails);
  const [loading, setLoading] = useState(true);
  const [partialLoading, setPartialLoading] = useState<{ [key: number]: boolean }>({});
  const [titleLoading, setTitleLoading] = useState<{ [key: number]: boolean }>({});

  const fetchData = async (partialLoad = false) => {
    if (!partialLoad) setLoading(true);
    const response = await issuesApi.getIssueDetails(`${id}`);
    const { data, error } = response;
    if (!error) {
      setIssueDetails(data);
    } else {
      console.error('Error:', error);
    }
    if (!partialLoad) setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleSave = async (data: { [key: string]: string }, loadingIndex: number) => {
    const titleValue = data['titleValue'];
    const titleChanged = titleValue !== titles[loadingIndex];
    let titleData = {};
    switch (loadingIndex) {
      case 1:
        titleData = { firstName: titleValue.split(' ')[0], lastName: titleValue.split(' ')[1] ?? ' ' };
        break;
      case 2:
        titleData = { assigneeName: titleValue };
        break;
      case 3:
        titleData = { code: titleValue };
        break;
    }

    delete data.titleValue;

    const transformedData = Object.entries(data).reduce((acc: any, [key, value]) => {
      // @ts-ignore
      if (value === '') value = null;
      acc[key.replace(' ', '')] = value;
      return acc;
    }, {});
    let dataChanged = false;
    Object.keys(transformedData).forEach((key) => {
      if (issueDetails[key as keyof IssueDetailsInterface] !== transformedData[key]) {
        dataChanged = true;
      }
    });
    if (dataChanged || titleChanged) {
      if (dataChanged) setPartialLoading((partialLoading) => ({ ...partialLoading, [loadingIndex]: true }));
      if (titleChanged) setTitleLoading((titleLoading) => ({ ...titleLoading, [loadingIndex]: true }));
      const updatedData = { ...issueDetails, ...transformedData, ...titleData };
      await issuesApi.updateIssueDetails(updatedData as IssueDetailsInterface);
      await fetchData(true);
    }
    setTimeout(() => {
      setPartialLoading((partialLoading) => ({ ...partialLoading, [loadingIndex]: false }));
      setTitleLoading((titleLoading) => ({ ...titleLoading, [loadingIndex]: false }));
    }, 1000);
  };

  const occurenceFields = ['formattedDateOpened', 'formattedDateUpdated', 'managementMemo'];
  const clientFields = ['phone', 'availabilityText'];
  const assigneeFields = ['departmentName', 'parVin', 'categoryName', 'issueUpdate'];
  const resolutionFields = ['issueRule', 'resolution'];

  const occurenceData: LabeledValueProps[] = [];
  const clientData: LabeledValueProps[] = [];
  const assigneeData: LabeledValueProps[] = [];
  const resolutionData: LabeledValueProps[] = [];

  const dataCards = [occurenceData, clientData, assigneeData, resolutionData];
  const preTitles = [
    'Occurrence: Issue',
    'Client:',
    'Assignee:',
    `Resolution:${issueDetails.code ? ' Code ' : ''}`,
  ];
  const titles = [
    `${issueDetails.id}`,
    `${issueDetails.firstName} ${issueDetails.lastName}`,
    `${issueDetails.assigneeName ?? 'Unassigned'}`,
    `${issueDetails.code ? issueDetails.code : 'Unresolved'}`,
  ];

  Object.keys(issueDetails || {})
    .sort()
    .map((key) => {
      if (occurenceFields.includes(key)) {
        occurenceData.push(constructData(key, issueDetails));
      }

      if (clientFields.includes(key)) {
        clientData.push(constructData(key, issueDetails));
      }

      if (assigneeFields.includes(key)) {
        assigneeData.push(constructData(key, issueDetails));
      }

      if (resolutionFields.includes(key)) {
        resolutionData.push(constructData(key, issueDetails));
      }
    });

  const isMediumScreen = useMediaQuery(`(max-width:1600px`);
  const isSmallScreen = useMediaQuery(`(max-width:1200px`);

  return (
    <Flex column alignItems="flex-start" gap="48px" styles={{ minWidth: '100%', boxSizing: 'border-box' }}>
      <Flex width="100%" justifyContent="center" padding="0 2rem" styles={{ boxSizing: 'border-box' }}>
        <WithLabel
          component={
            <Icon
              icon={<ThunderstormOutlinedIcon />}
              iconColor={iconColors[numericId % 4]}
              backgroundColor={backgroundColors[numericId % 4]}
              size={92}
            />
          }
          label={`${issueDetails?.description}`}
          fontSize={isSmallScreen ? '32px' : isMediumScreen ? '48px' : '64px'}
          gap="32px"
        />
      </Flex>
      <CardContainer>
        {dataCards.map((data, index) => (
          <EditableInfoCard
            loading={loading || partialLoading[index]}
            titleLoading={titleLoading[index]}
            key={index}
            decorativeElement={
              <Flex gap="1rem" styles={{ flexShrink: 0 }}>
                <Icon
                  icon={<BoltIcon />}
                  iconColor={iconColors[index % 4]}
                  backgroundColor={backgroundColors[index % 4]}
                  size={40}
                />
                <PreTitle>{preTitles[index]}</PreTitle>
              </Flex>
            }
            title={titles[index]}
            titleSpacing="0.5rem"
            canEditTitle={index !== 0}
            items={data}
            shadow={shadows[index % 4]}
            columns={isSmallScreen ? 1 : isMediumScreen ? 2 : 3}
            onSave={(data) => handleSave(data, index)}
            padding="1rem 2rem 2rem 2rem"
          />
        ))}
      </CardContainer>
    </Flex>
  );
};

export default IssueDetailsPage;
