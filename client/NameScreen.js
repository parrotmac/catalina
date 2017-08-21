import Logo from 'client/Logo'
import TextEntry from 'client/TextEntry'

export default class NameScreen extends Component {
	constructor () {
		super ()
	}
	render () {
		return (
			<div class="page page-center">
				<Logo size="large"/>
				<TextEntry onSubmit={ this.onSubmit }/>
			</div>
		)
	}
	onSubmit = (text) => {
		this.props.onUsernameChosen && this.props.onUsernameChosen (text)
	}
}
