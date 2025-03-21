import React from 'react'
import {Provider} from 'react-redux'
import { testStore } from 'store/store'

const ReduxDecorator = (story) => (
    <Provider store={testStore}>
        { story() }
    </Provider>
)

export default ReduxDecorator
