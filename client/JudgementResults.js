import Topbar from 'client/Topbar'
import UserButton from "client/UserButton";
import Button from "client/Button";

export default class extends Component {
    constructor () {
        super ()
    }
    render () {
        const { username, submissions, judgingSubmissionIndex } = this.props
        const _submission = submissions[judgingSubmissionIndex];
        return (
            <div class="window">
                <Topbar username={ username }/>
                <div class="page page-center">
                    <h3>The results are in!</h3>
                    <p>"{_submission.response}" was <strong>{_submission.username}</strong></p>
                    <div>
                        <p>
                            <strong>Correct:</strong>
                            {_submission.guesses.filter(g => g.guessed===_submission.username).map(correctGuess => <UserButton username={correctGuess.guesser} />)}
                        </p>
                        <p>
                            <strong>Incorrect:</strong>
                            {_submission.guesses.filter(g => g.guessed!==_submission.username).map(incorrectGuess => <UserButton username={incorrectGuess.guesser} />)}
                        </p>
                        <hr />
                        <Button title="Next" onClick={this.props.onNext} />
                    </div>
                </div>
            </div>
        )
    }
}

