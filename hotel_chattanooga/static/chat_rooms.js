document.addEventListener('DOMContentLoaded', () => {
    panel = document.getElementById('postsPanel');
    panel.scrollTop = panel.scrollHeight;
    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    
    // When connected, configure buttons
    socket.on('connect', () => {
        // Each button should emit a "submit vote" event
        document.getElementById('flak_chat_room_creation_button').onclick = () => {   
            const chat_room_name = document.getElementById('flak_chat_room_to_create').value;      
            socket.emit('create chat room', {'chat_room_name': chat_room_name});    
        }

        document.querySelectorAll(".flak_chat_room").forEach(button => {
            button.onclick = () => {
                let participant = localStorage.getItem('user');
                const room_name = button.dataset.room;
                const data = JSON.parse(participant);
                data['selected_room'] = room_name; 
                console.log(data);
                console.log(data.name);
                console.log(data.current_room);
                console.log(data.selected_room);
                socket.emit('chat room joined', data);
            }
        });

        

    });

    // When a new vote is announced, add to the unordered list
    socket.on('rooms update', data => {
        history.go(0); //reloads the page
        console.log(data);
    });


    socket.on('go to room', function (data) {
        let participant = JSON.parse(localStorage.getItem('user'));
        console.log(participant);
        console.log(participant.name);
        console.log(participant.current_room);
        console.log(participant.selected_room);
        console.log(data);
        participant.current_room = data;
        participant.selected_room = "";
        console.log(participant);
        localStorage.setItem('user',JSON.stringify(participant));
        participant = JSON.parse(localStorage.getItem('user'));
        console.log(participant);
        window.location = location.protocol + '//' + document.domain + ':' + location.port + "/chat_room/" + data;


/*
        participant.current_room = data;
        participant.selected_room = "";
        console.log(participant);
        localStorage.setItem('user',JSON.stringify(participant));
        window.location = location.protocol + '//' + document.domain + ':' + location.port + "/chat_room/" + data;
    
*/
    });


});




/*

//helper function to redirect to chatrooms.html
//https://stackoverflow.com/a/56321911/8914046
function url_redirect(url){
    var X = setTimeout(function(){
        window.location.replace(url);
        return true;
    },300);

    if( window.location = url ){
        clearTimeout(X);
        return true;
    } else {
        if( window.location.href = url ){
            clearTimeout(X);
            return true;
        }else{
            clearTimeout(X);
            window.location.replace(url);
            return true;
        }
    }
    return false;
};

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