import React from 'react'
import {addDecorator} from '@storybook/react'
import {ApolloProvider} from '@apollo/react-hooks'
import client from "../src/config/apollo"

// It's a special token that doesn't expired
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Impkb2VAZW1haWwuY29tIiwiX2lkIjoiNTliMDAzNzUwZTM3NjYwNDE0NDAxNzFmIiwiYWRtaW4iOnRydWUsImlhdCI6MTU5NDQ1MDQ0OH0.c7wwO3HmINqoER5zK8LcUL_Cz8lI5YCaMinrIVNa8cM";
localStorage.setItem("token", token)

// Enable use of graphql in stories
addDecorator((storyFn) => <ApolloProvider client={client}> {storyFn()} </ApolloProvider>)