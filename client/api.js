
var socket = io.connect(window.location.origin);
socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});

var debugOutput = document.querySelector("#debugOutput");

var state = {
    status: "disconnected"
};
export function updateStatus() {
    // Update DOM
    console.log(state);
    // debugOutput.innerHTML = JSON.stringify(state);
}

export function joinAs(username) {
    socket.emit("join-as", {
        username: username
    });
    state.requestedName = username;
    updateStatus();
}
socket.on('user-join-response', data => {
    if (data.status === "success") {
        if (data.username == state.requestedName) {
            state.username = data.username;
            state.status = "connected";
            updateStatus();
        }
    } else {
        // This isn't available in React, but IDK what we want to do instead
        alert("That username isn't available");
    }
})

export function removeUser(username) {
    socket.emit("remove-user", {
        username: username
    });
}
socket.on('removed-user', data => {
    if (data.username === state.username) {
        if (data.status === 'success') {
            state.username = null;
            state.status = "disconnected";
            updateStatus();
        } else {
            alert("Unable to remove " + data.username);
        }
    }
})

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

let statusCallbacks = [];
export function addStatusUpdate(callback) {
    statusCallbacks.push(callback);
}

socket.on('status-update', newState => {
    for (let i = 0; i < statusCallbacks.length; i++) {
        statusCallbacks[i](newState);
    }
});
