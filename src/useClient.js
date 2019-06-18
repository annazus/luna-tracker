import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";

// import { WebSocketLink } from "apollo-link-ws";
import { createHttpLink } from "apollo-link-http";

const getClient = () => {
  let link;
  link = createHttpLink({ uri: "http://localhost:4000/" });

  const token = window.localStorage.getItem("token");
  if (token) {
    const authLink = setContext((_, headers) => ({
      ...headers,
      Authorization: `Bearer ${token}`
    }));
    link = authLink.concat(link);
  }

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link
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
