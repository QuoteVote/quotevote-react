import React from 'react'
import {Provider} from 'react-redux'
import store from 'store/store'

const ReduxDecorator = (story) => (
    <Provider store={store}>
        { story() }
    </Provider>
)

export default ReduxDecorator
