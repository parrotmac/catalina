import Logo from 'client/Logo'
import TextEntry from 'client/TextEntry'

export default class extends Component {
	constructor () {
		super ()
	}
	render () {
		return (
			<div class="window">
				<div class="page page-center name-screen">
					<Logo size="large"/>
					<TextEntry placeholder="Your new username" onSubmit={ this.onSubmit }/>
				</div>
			</div>
		)
	}
	onSubmit = (text) => {
		this.props.onUsernameChosen && this.props.onUsernameChosen (text)
	}
}
