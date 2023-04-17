import { NgModule } from '@angular/core';
import { DefaultOptions, InMemoryCache } from '@apollo/client/core';
import { APOLLO_NAMED_OPTIONS, ApolloModule, NamedOptions } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';


const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};


@NgModule({
  exports: [ApolloModule],
  providers: [

  ],
})
export class GraphQLModule {}
