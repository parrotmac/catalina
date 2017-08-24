export default class extends Component {
	componentDidMount () {
		this.input.value = ''
	}
	render () {
		return (
			<form class="pill-input-group" onSubmit={ this.onSubmit }>
				<input placeholder="Your new username" class="pill-group-input" ref={ c => this.input = c } type="text"/>
				<input class="pill-group-button" type="submit" value="GO"/>
			</form>
		)
	}
	onSubmit = (ev) => {
		ev.preventDefault ()
		this.props.onSubmit && this.props.onSubmit (this.input.value)
	}
}

