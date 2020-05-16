document.addEventListener('DOMContentLoaded', function() {

    const participant_name = JSON.parse(localStorage.getItem('user')).name;
    self_chat_style("." + participant_name);
    concierge_chat_style(".Concierge");

    panel = document.getElementById('postsPanel');
    panel.scrollTop = panel.scrollHeight;
    // Connect to websocket
    const socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    socket.on('connect', function() {
        document.getElementById('flak_post_message_button').onclick = insertPost;
        document.onkeydown = verifyKeyAndCreateChatroom;
    });


    // When a new vote is announced, add to the unordered list
    socket.on('post received', data => {
        if (document.getElementById('flak_room_name').dataset.room == data){
            history.go(0); //reloads the page      
        }
    });

    function verifyKeyAndCreateChatroom(pressedKey){
        if (pressedKey.key === "Enter") {
            pressedKey.preventDefault();
            insertPost();
        }
    }
    
    function insertPost(){
        const new_post = document.getElementById('messageToPost').value;
        const data = JSON.parse(localStorage.getItem('user'));
        data['post'] = new_post;
        socket.emit('new post', data);   
    }    

});


function self_chat_style(selector)
{
    var elements = document.querySelectorAll(selector);
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.color = "Aquamarine";
        elements[i].style.textAlign = "right";
        elements[i].style.marginRight = "50px";
        
    }
}

function concierge_chat_style(selector)
{
    var elements = document.querySelectorAll(selector);
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.color = "yellow";
        elements[i].style.textAlign = "center";        
    }
}

