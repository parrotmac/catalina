export default class extends Component {
	render () {
		const { title, onClick } = this.props
		return (
			<button class="button" onClick={ onClick }>{ title }</button>
		)
	}
}

