export default class extends Component {
	render () {
		const { title, onClick } = this.props
		return (
			<button class="action-pill" onClick={ onClick }>{ title }</button>
		)
	}
}

