export default class extends Component {
	render () {
		const { items } = this.props
		return (
			<div class="select-list">
				{ items.map ((item, i) => (
					<button class="select-item" onClick={ ev => this.onSelect (ev, i) }>{ item }</button>
				)) }
			</form>
		)
	}
	onSelect = (ev, index) => {
		ev.preventDefault ()
		this.props.onSelect && this.props.onSelect (index)
	}
}

