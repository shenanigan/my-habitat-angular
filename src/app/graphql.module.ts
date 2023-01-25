import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, ApolloLink, DefaultOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';
import { StorageService } from './shared/infrastructure/storage/storage.service';

// const uri = 'https://localhost:7022/graphql'; // <-- add the URL of the GraphQL server here
const uri = 'https://my-habitat-dotnet-read.azurewebsites.net/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink, storageService: StorageService): ApolloClientOptions<any> {
  const auth = setContext((operation, context) => {
    const token = storageService.getToken()

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
      deps: [HttpLink, StorageService],
    },
  ],
})
export class GraphQLModule { }
