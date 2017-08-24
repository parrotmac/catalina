import LoadingScreen from 'client/LoadingScreen'
import NameScreen from 'client/NameScreen'
import StartScreen from 'client/StartScreen'
import RespondScreen from 'client/RespondScreen'
import WaitingScreen from 'client/WaitingScreen'
import { joinAs, requestThingsList, nextRound } from 'client/api'
import { joinAs, requestThingsList, nextRound, setStatusCallback, submitResponse } from 'client/api'

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
	}
	componentWillMount () {
		const username = localStorage.getItem ('N')
		if (username) this.setUsername (username)
		setStatusCallback (newState => {
			this.setState (newState)
		})
	}
	render () {
		const { username, thingsList, usernameFailed, isAcceptingResponses, allowingResponsesFor, cardIndex, submissions, judgingSubmissionIndex } = this.state
		if (!username) {
			return (
				<NameScreen onUsernameChosen={ this.onUsernameChosen } usernameFailed={ usernameFailed }/>
			)
		}
		if (!thingsList) {
			return (
				<LoadingScreen/>
			)
		}
		if (isAcceptingResponses) {
			const hasSubmitted = submissions.filter (submission => submission.username === username).length > 0
			if (!hasSubmitted) {
				return (
					<RespondScreen username={ username } card={ thingsList [cardIndex] } time={ allowingResponsesFor } onResponse={ this.onResponse }/>
				)
			} else {
				return (
					<WaitingScreen username={ username } card={ thingsList [cardIndex] } time={ allowingResponsesFor }/>
				)
			}
		}
		if (judgingSubmissionIndex > -1) {
			return null
		}
		return (
			<StartScreen username={ username } title="START" onStart={ this.onStartGame }/>
		)
	}
	onUsernameChosen = (username) => {
		localStorage.setItem ('N', username)
		joinAs (username, ({ username, status }) => {
			if (status === 'success') {
				this.setState ({ usernameFailed: false, username })
				this.setUsername (username)
			} else {
				this.setState ({ usernameFailed: true, username })
			}
		})
	}
	setUsername (username) {
		this.setState ({ username })
		requestThingsList (({ thingsList }) => {
			this.setState ({ thingsList })
		})
	}
	onStartGame = () => {
		nextRound (this.state.username)
	}
	onResponse = (response) => {
		submitResponse (this.state.username, response, this.state.cardIndex)
	}
}

