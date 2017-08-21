export default class TextEntry extends Component {
	componentDidMount () {
		this.input.value = ''
	}
	render () {
		return (
			<form class="text-entry" onSubmit={ this.onSubmit }>
				<input ref={ c => this.input = c } type="text"/>
				<input type="submit" value="GO"/>
			</form>
		)
	}
	onSubmit = (ev) => {
		ev.preventDefault ()
		this.props.onSubmit && this.props.onSubmit (this.input.value)
	}
}

