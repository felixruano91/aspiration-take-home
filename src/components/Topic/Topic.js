import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex } from '@chakra-ui/react';
import { useApolloClient, useLazyQuery } from '@apollo/client';
import { GET_TOPIC_WITH_RELATED_TOPICS_BY_NAME as query } from '../../graphQL';
import { writeQueryToCache } from '../../utils';

const Topic = ({ topicName }) => {
  const client = useApolloClient();
  const variables = useMemo(() => ({ name: topicName }), [topicName]);
  const [cachedData, setCachedData] = useState();
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isToggled, setIsToggled] = useState(false);
  const [callQuery, {
    loading,
    data,
  }] = useLazyQuery(query, { variables });
  const shouldUseCachedData = cachedData && cachedData.topic.name === topicName;
  const shouldRenderRelatedTopics = isToggled && currentIndex > -1;

  useEffect(() => {
    if (isToggled && currentIndex > -1) {
      writeQueryToCache({
        queryCaller: callQuery,
        client,
        query,
        variables,
        setCachedData,
      });
    }
  }, [isToggled, currentIndex, callQuery, client, variables]);

  useEffect(() => {
    if (currentIndex === -1) {
      writeQueryToCache({
        queryCaller: callQuery,
        client,
        query,
        variables,
        setCachedData,
      });
    }
  }, [callQuery, client, currentIndex, variables]);

  const handleToggleChange = e => {
    setCurrentIndex(e);
    setIsToggled(!isToggled);
  };

  const renderRelatedTopics = data => (
    data.topic.relatedTopics.map(topic => (
      <Flex key={topic.id} flexDirection='row' flex='1' alignItems='space-between'>
        <Topic topicName={topic.name} />
      </Flex>
    ))
  );

  const handleRenderRelatedTopics = () => {
    if (shouldRenderRelatedTopics) {
      if (shouldUseCachedData) {
        return renderRelatedTopics(cachedData);
      } else {
        return renderRelatedTopics(data)
      }

    }

    return null;
  }

  return (data || cachedData) && !loading ? (
    <Accordion flex='1' allowToggle onChange={handleToggleChange}>
      <AccordionItem>
        <h2>
          <AccordionButton flex='1' backgroundColor={isToggled ? '#fafafa' : 'none'}>
            <Box flex='1' textAlign='left'>
              <Flex justifyContent='space-evenly'>
                <Flex flex='4'>
                  Name: {shouldUseCachedData ? cachedData.topic.name : data.topic.name}
                </Flex>
                <Flex flex='1'>
                  Stargazer Count - {shouldUseCachedData ? cachedData.topic.stargazerCount : data.topic.stargazerCount}
                </Flex>
              </Flex>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} padding='0'>
          {handleRenderRelatedTopics()}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  ) : (
    <Accordion flex='1' allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton flex='1' height='40px' />
        </h2>
      </AccordionItem>
    </Accordion>
  );
};

Topic.propTypes = {
  topicName: PropTypes.string.isRequired,
};

export default Topic;