document.addEventListener('DOMContentLoaded', () => {

    const INDEX_PAGE = location.protocol + '//' + document.domain + ':' + location.port;
    if (localStorage.getItem('user') == null){
        window.location = INDEX_PAGE ; 
    }
    else {
        document.getElementById('flak_chat_room_to_create').select();
        panel = document.getElementById('postsPanel');
        panel.scrollTop = panel.scrollHeight;
        // Connect to websocket
        var socket = io.connect(INDEX_PAGE);

        // When connected, configure buttons
        socket.on('connect', function() {
            document.getElementById('flak_chat_room_creation_button').onclick = createChatroom;
            document.onkeydown = verifyKeyAndCreateChatroom;

            document.querySelectorAll(".flak_chat_room").forEach(button => {
                button.onclick = () => {
                    let participant = localStorage.getItem('user');
                    const room_name = button.dataset.room;
                    const data = JSON.parse(participant);
                    data['selected_room'] = room_name; 
                    socket.emit('chat room joined', data);
                }
            });
        });

        // When a new vote is announced, add to the unordered list
        socket.on('rooms update', data => {
            history.go(0); //reloads the page
        });

        socket.on('go to room', function (data) {
            let participant = JSON.parse(localStorage.getItem('user'));
            participant.current_room = data;
            participant.selected_room = "";
            localStorage.setItem('user',JSON.stringify(participant));
            participant = JSON.parse(localStorage.getItem('user'));
            window.location = INDEX_PAGE + "/chat_room/" + data;
        });

        socket.on('room exists already', ()=>{
            alert ("chatroom exists already");
        });

        function verifyKeyAndCreateChatroom(pressedKey){
            if (pressedKey.key === "Enter") {
                pressedKey.preventDefault();
                createChatroom();
            }
        }
        
        function createChatroom(){
            const chat_room_name = document.getElementById('flak_chat_room_to_create').value;
            socket.emit('create chat room', {'chat_room_name': chat_room_name});
        }
    }
});


