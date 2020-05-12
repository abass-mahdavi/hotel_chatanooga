document.addEventListener('DOMContentLoaded', function() {

    if (!(user = localStorage.getItem('user'))){ 
        // Connect to websocket
        var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

        // When connected, configure buttons
        socket.on('connect', () => {
            // Each button should emit a "submit vote" event
            document.getElementById('flak_post_message_button').onclick = () => {   
                const new_post = document.getElementById('messageToPost').value;      
                socket.emit('chat room update', {'post': new_post},{'name' : name["name"]});    
            }

    });

    // When a new vote is announced, add to the unordered list
    socket.on('rooms update', data => {
        history.go(0); //reloads the page
        localStorage.setItem('user', data);
        console.log(data);
    });
    

    }


    
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