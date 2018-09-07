import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const testToken = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/3c432e8b-8092-43c8-b487-84812fa8a87b/token"
const instanceLocator = "v1:us1:3c432e8b-8092-43c8-b487-84812fa8a87b"
const roomId = 15613464
const username = 'tkachuk_lizaveta'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            messages: []
        }
        this.sendMessage = this.sendMessage.bind(this)
    }

    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: instanceLocator,
            userId: 'janedoe',
            tokenProvider: new Chatkit.TokenProvider({
                url: testToken
            })
        })

        chatManager.connect()
            .then(currentUser => {
                this.currentUser = currentUser
                this.currentUser.subscribeToRoom({
                    roomId: roomId,
                    hooks: {
                        onNewMessage: message => {

                            this.setState({
                                messages: [...this.state.messages, message]
                            })
                        }
                    }
                })
            })
    }

    sendMessage(text) {
        this.currentUser.sendMessage({
            text,
            roomId: roomId
        })
    }

    render() {
        return (
            <div className="app">
                <Title />
                <MessageList
                    roomId={this.state.roomId}
                    messages={this.state.messages} />
                <SendMessageForm
                    sendMessage={this.sendMessage} />
            </div>
        );
    }
}
class MessageList extends React.Component {
    render() {
    }
}
class SendMessageForm extends React.Component {


    render() {
    }
}
function Title() {
    return <p className="title">My awesome chat app</p>
}

ReactDOM.render(<App />, document.getElementById('root'));