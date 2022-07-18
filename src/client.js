import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import config from "./auth_config.json";
import * as Sentry from "@sentry/react";

export const sendErrorToSentry = ({ name, message, extra, tags }) => {
  const error = new Error();
  error.message = message;
  error.name = name;
  if (!tags) tags = {};
  // Sentry called
  Sentry.captureException(error, {
    tags,
    extra,
  });
};

const link = new HttpLink({
  uri: "https://great-raven-95.hasura.app/v1/graphql",
  headers: { "x-hasura-admin-secret": config.apiSecret },
});

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client;
