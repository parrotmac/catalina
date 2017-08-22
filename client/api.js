let socket = io.connect(window.location.origin);

export function joinAs(username, callback) {
    socket.emit("join-as", {
        username: username
    });
    socket.on('user-join-response', callback);
    /*
    callback gets called with an object containing
    {
        username: <(string) user's username>,
        status: <(string) 'success' or 'failure'>,
        thingsList: <(array<string>) containing questions for the group>
    }
    Note: this could be emitted to every user, so check the returned username against a stored username
     */
}

export function removeUser(username, callback) {
    socket.emit("remove-user", {
        username: username
    });
    socket.on('removed-user', callback);
    /*
    callback gets called with an object containing
    {
        username: <(string) user's username>,
        status: <(string) 'success' or 'failure'>
    }
    Note: As above, check the returned username against a local string to ensure relevance
     */
}

export function requestThingsList(callback) {
    socket.emit('request-things-list', {});

    socket.on("things-list", callback);
    /*
    {
        thingsList: <(array<string>) List of strings of questions>
    }
    */
}

export function nextRound(user) {
    /* Call to start game or advance to next round */
    socket.emit("next-round", {
        user: user
    });
}

export function submitResponse(user, response, cardIndex) {
    /*
    user: User's username
    response: User's response to the current question
    cardIndex: Index of the question being asked
    */
    socket.emit('submit-answer', {
        user: user,
        response: response,
        cardIndex: cardIndex
    })
}

export function submitGuess(user, submissionIndex, suspect, cardIndex) {
    /*
    user: Username of player which is submitting their guess
    submissionIndex: Index inside submission array
    suspect: username of player being guessed
     */
    socket.emit('submit-guess', {
        user: user,
        submissionIndex: submissionIndex,
        suspect: suspect,
        cardIndex: cardIndex
    })
}

export function nextSubmission(user) {
    socket.emit('next-submission', {
        user: user
    });
}

let statusCallback = () => {};
export function setStatusCallback(callback) {
    statusCallback = callback;
}

socket.on('status-update', newState => {
    statusCallback(newState);
});
