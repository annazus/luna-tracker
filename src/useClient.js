import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
// import { WebSocketLink } from "apollo-link-ws";
import { HttpLink } from "apollo-link-http";

const useClient = () => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({ uri: "http://localhost:4000/" })
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

export { useClient as default };
