document.addEventListener('DOMContentLoaded', function() {

    setInterval(refresh, 10000);

    const INDEX_PAGE = location.protocol + '//' + document.domain + ':' + location.port;
    if (localStorage.getItem('user') == null){
        window.location = INDEX_PAGE ; 
    }
    else {
        document.getElementById('messageToPost').select();
        const participant_name = JSON.parse(localStorage.getItem('user')).name;
        self_chat_style("." + participant_name);
        concierge_chat_style(".Concierge");

        panel = document.getElementById('postsPanel');
        panel.scrollTop = panel.scrollHeight;
        // Connect to websocket
        const socket = io.connect(INDEX_PAGE);

        socket.on('connect', function() {
            document.getElementById('flak_post_message_button').onclick = insertPost;
            document.onkeydown = verifyKeyAndCreateChatroom;
        });


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
    }

    function refresh(){
        history.go(0); //reloads the page      
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

