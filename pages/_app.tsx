import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useQuery, gql, ApolloProvider } from '@apollo/client';
import client from "../apollo-client";


if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks')
}

function MyApp({ Component, pageProps }: AppProps) {
  return <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query GetAllUsers {
        users
      }
    `,
  });

  console.log(" got users ", data);
  return {
    props: {
      users: data.users.slice(0, 4),
    },
  };
}

export default MyApp
