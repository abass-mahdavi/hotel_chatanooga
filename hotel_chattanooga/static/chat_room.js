document.addEventListener('DOMContentLoaded', function() {
    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
    var participant = localStorage.getItem('user');
    const room_name = document.getElementById('flak_room_name').innerHTML; 
    const data = JSON.parse(participant);
    data['current_room'] = room_name;
    socket.emit('chat room joined', data);  

    if (participant){ 
        //configure buttons
        socket.on('connect', () => {


            // Each button should emit a "submit vote" event
            document.getElementById('flak_post_message_button').onclick = () => {   
                const new_post = document.getElementById('messageToPost').value;                      

                data['post'] = new_post;
                socket.emit('chat room update', data);   
            }

        });
    }

    // When a new vote is announced, add to the unordered list
    socket.on('rooms update', data => {
        history.go(0); //reloads the page
        localStorage.setItem('user', data);
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
