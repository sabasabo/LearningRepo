const instanceLocator = 'v1:us1:15aa08b3-8149-4ecd-a5bf-543c10e74757';
const testToken =  'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/15aa08b3-8149-4ecd-a5bf-543c10e74757/token'
const username = 'yo1'
const roomId = 16973039;


const DUMMY_DATA = [
	{
		senderId: "perborgen",
		text: "who'll win?"
	},
	{
		senderId: "janedoe",
		text: "who'll win?"
	}
]


class App extends React.Component {			
	
	constructor() {
		super();		
		this.state = {
			messages: []
		}
		this.sendMessage = this.sendMessage.bind(this);
	}
	
	render() {
		return(
			<div className="app" >
				<Title />
				<MessageList messages={this.state.messages}/>
				<SendMessageForm sendMessage={this.sendMessage}/>
			</div>
		)
		
	}
	
	componentDidMount() {
		let chatManager = new Chatkit.ChatManager({
			instanceLocator: instanceLocator,
			userId: username,
			tokenProvider: new Chatkit.TokenProvider({
				url: testToken
			})
		});
		chatManager.connect().then(currentUser => {
			this.currentUser = currentUser;
			currentUser.subscribeToRoom({
				roomId: roomId,
				hooks: {
					onNewMessage: message => {
						this.setState({
							messages: [...this.state.messages, message]
						})
					}
				}
			})
		});
		
	}
	
	sendMessage(text) {
		this.currentUser.sendMessage({
			text: text,
			roomId: roomId
		});
	}
}

class MessageList extends React.Component {
	
	render() {
		return (
			<ul className="message-list">
			{this.props.messages.map( message => (
				<li key={message.id} className="message">
					<div> {message.senderId} </div>
					<div> {message.text} </div>
				</li>					
			))}
			</ul>
		)
	}
	
}

class SendMessageForm extends React.Component {
	constructor() {
		super();
		this.state = {
			message: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	render() {
		return (
			<form onSubmit={this.handleSubmit} className="send-message-form">
				<input type="text" onChange={this.handleChange}
				value={this.state.message} placeholder="Type your message and hit ENTER"/>				
			</form>
		)
	}
	
	handleChange(e) {
		this.setState({
			message: e.target.value
		});
	}
	
	handleSubmit(e) {
		e.preventDefault();
		this.props.sendMessage(this.state.message);
		this.state.message = '';
	}
}

class Title extends React.Component {
	render() {
		return (
			<p className="title">My First React Chat app</p>
		)
	}
}
ReactDOM.render(<App />, document.getElementById('root'));