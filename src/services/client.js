import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client';
import { endpoint, token } from '../config';
import { setContext } from '@apollo/client/link/context';

const link = new HttpLink({ uri: endpoint });

const setAuthorizationLink = setContext((request, previousContext) => ({
  headers: {
    ...previousContext.headers,
    authorization: `Bearer ${token}`
  }
}));

const typeDefs = gql`
    type topic {
        name: String
        stargazerCount: Int
        id: String
        relatedTopics: [topic]
    }
`;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  typeDefs,
  link: setAuthorizationLink.concat(link)
});

export default client;