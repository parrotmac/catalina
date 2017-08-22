import NameScreen from 'client/NameScreen'
import StartScreen from 'client/StartScreen'
import { joinAs, getThings, nextRound } from 'client/api'

export default class extends Component {
	constructor () {
		super ()
		this.state = {
			username: null,
			usernameFailed: false,
			readyToStart: false,
			thingsList: null,
			state: null,
		}
		const username = localStorage.getItem ('N')
		if (username) this.setUsername (username)
	}
	render () {
		const { username, usernameFailed } = this.state
		if (!username) {
			return (
				<NameScreen onUsernameChosen={ this.onUsernameChosen } usernameFailed={ usernameFailed }/>
			)
		}
		if (true) {
			return (
				<StartScreen username={ username } title="START" onStart={ this.onStartGame }/>
			)
		}
	}
	onUsernameChosen = (username) => {
		localStorage.setItem ('N', username)
		this.setUsername (username)
	}
	setUsername (username) {
		joinAs (username, ({ username, status }) => {
			if (status === 'success') {
				getThings (thingsList => {
					this.setState ({ usernameFailed: false, username, thingsList })
				})
			} else {
				this.setState ({ usernameFailed: true })
			}
		})
	}
	onStartGame = () => {
		nextRound (this.state.username)
	}
}

