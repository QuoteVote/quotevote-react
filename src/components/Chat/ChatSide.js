import React, { PureComponent } from "react"
import { ApolloConsumer, withApollo } from "react-apollo"
import { connect } from "react-redux"
import GlobalMaximized from "../../components/Chat/GlobalMaximized"
import Minimized from "../../components/Chat/Minimized"
import { FixedWrapper, ThemeProvider } from "@livechat/ui-kit"

class ChatSideBar extends PureComponent {
  render = () => {
    const { isLoggedIn } = this.props
    if (isLoggedIn) {
      return (
        <ApolloConsumer>
          {client => (
            <ThemeProvider>
              <GlobalMaximized {...this.props} client={client} />
            </ThemeProvider>
          )}
        </ApolloConsumer>
      )
    }
    return null
  }
}

const mapStateToProps = ({ login: { isLoggedIn } }) => ({
  isLoggedIn
})

ChatSideBar.propTypes = {}

export default withApollo(connect(mapStateToProps)(ChatSideBar))
