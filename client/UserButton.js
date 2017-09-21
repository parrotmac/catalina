import Button from "client/Button";

export default class extends Component {
    render () {
        const { username, onClick } = this.props
        return (
            <button class="user-pill" style={this.props.style} onClick={ onClick }>{ username }</button>
        )
    }
}

