document.addEventListener('DOMContentLoaded', () => {

    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // When connected, configure buttons
    socket.on('connect', () => {
        // Each button should emit a "submit vote" event
        document.getElementById('flak_chat_room_creation_button').onclick = () => {   
            const chat_room_name = document.getElementById('flak_chat_room_to_create').value;      
            socket.emit('create chat room', {'chat_room_name': chat_room_name});    
        }

    });

    // When a new vote is announced, add to the unordered list
    socket.on('rooms update', data => {
        history.go(0); //reloads the page
        console.log(data);
    });


});


/*


document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#flak_post_message_button').onclick = updateDisplayArea;
    document.onkeydown = verifyKeyAndupdateDisplayArea;
});

function verifyKeyAndupdateDisplayArea(pressedKey){
    if (pressedKey.key === "Enter") {
        pressedKey.preventDefault();
        updateDisplayArea();
    }
}

function updateDisplayArea(){
    const postedMessage = document.getElementById('messageToPost');    
    const messageDisplayArea = document.getElementById('listOfPosts');
    if (postedMessage.value.replace(/\s/g, '')  != ""){
        const node = document.createElement("LI");
        node.innerHTML = wrapInHtml(postedMessage.value);
        messageDisplayArea.appendChild(node);
    }
    postedMessage.value  = "" ;
    messageDisplayArea.scrollIntoView({ behavior: 'smooth', block: 'end' }); 
}

function wrapInHtml(someString){
    return `<br><span class="label customized-primary">${someString}</span><br>`;
}




*/