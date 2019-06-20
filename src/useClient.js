import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";

// import { WebSocketLink } from "apollo-link-ws";
import { createHttpLink } from "apollo-link-http";

const getClient = () => {
  let link;
  const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
  });

  link = createHttpLink({ uri: process.env.REACT_APP_GRAPHQL_SERVER });
  const token = window.localStorage.getItem("token");
  if (token) {
    const authLink = setContext((_, { headers }) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${token}`
      }
    }));

    link = errorLink.concat(authLink.concat(link));
  }

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
    onError: ({ networkError, graphQLErrors }) => {
      console.log("graphQLErrors", graphQLErrors);
      console.log("networkError", networkError);
    }
  });

  // const wsLink = new WebSocketLink({
  //   uri: "ws://localhost:4000",
  //   options: {
  //     reconnect: true
  //   }
  // });

  // link: wsLink,
  return client;
};

export { getClient as default };
