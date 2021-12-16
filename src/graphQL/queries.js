import { gql } from '@apollo/client';

export const GET_TOPIC_WITH_RELATED_TOPICS_BY_NAME = gql`
    query getTopicWithRelatedTopicsByName($name: String!) {
        topic(name: $name) {
            name
            stargazerCount
            relatedTopics {
                name
                stargazerCount
                id
            }
            id
        }
    }
`;