import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, ApolloLink, DefaultOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';

const uri = 'https://localhost:7022/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const auth = setContext((operation, context) => {
    // const token = localStorage.getItem('token');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJIb21lT3duZXIiLCJTb2NpZXR5SWQiOiI0ZmFmMTdjMy1jOWQ0LTQxNmEtYWU3Mi0zYzVkZjk5YjE3NDQiLCJ1c2VySWQiOiIxN2JkNjExNi02MzE4LTRlNjItYTQ1Zi03NWFjODhkYzIzZjMiLCJleHAiOjE5Mjc3MjgwNjYsImlzcyI6Imh0dHBzOi8vbXloYWJpdGF0LmNvbSIsImF1ZCI6Imh0dHBzOi8vbXloYWJpdGF0LmNvbSJ9.AJ45F25olcBiK9s7uYvr_KnUSt1wBygKnYy-pdGzeME';

    if (token === null) {
      return {};
    } else {
      return {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    }
  });


  const link = ApolloLink.from([auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();


  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }

  return {
    link,
    cache,
    defaultOptions
  }
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }
