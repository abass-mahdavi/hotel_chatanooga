document.addEventListener('DOMContentLoaded', function() {
    
    setInterval(refresh, 5000);   


    const INDEX_PAGE = location.protocol + '//' + document.domain + ':' + location.port;
    if (localStorage.getItem('user') == null){
        window.location = INDEX_PAGE ; 
    }
    else {
        if (localStorage.getItem('postBuffer')!=null){
            document.getElementById('messageToPost').value = localStorage.getItem('postBuffer');
        }
        //get the message to post and position the cursor at the end
        input = document.getElementById('messageToPost');
        input.select();
        moveCursorToEnd(input);
        
        const participant_name = JSON.parse(localStorage.getItem('user')).name;
        self_chat_style("." + participant_name);
        concierge_chat_style(".Concierge");

        panel = document.getElementById('postsPanel');
        panel.scrollTop = panel.scrollHeight;
        // Connect to websocket
        const socket = io.connect(INDEX_PAGE);

        socket.on('connect', function() {
            document.getElementById('flak_post_message_button').onclick = insertPost;
            document.onkeydown = verifyKeyAndinsertPost;
            document.getElementById('go_to_chatrooms_board').onclick = gotToChatroomsBoard;
        });




        socket.on('post received', data => {
            if (document.getElementById('flak_room_name').dataset.room == data){

                history.go(0); //reloads the page      
            }
        });

        socket.on('participant ready to go to chatrooms board', ()=>{
            const participant = JSON.parse(localStorage.getItem('user'));
            participant['current_room'] = "";
            localStorage.setItem('user',JSON.stringify(participant));
            window.location = INDEX_PAGE + '/chat_rooms';  

        });

        function verifyKeyAndinsertPost(pressedKey){
            if (pressedKey.key === "Enter") {
                pressedKey.preventDefault();
                insertPost();
            }
        }
        
        function insertPost(){
            const new_post = document.getElementById('messageToPost').value;
            const data = JSON.parse(localStorage.getItem('user'));
            data['post'] = new_post;
            localStorage.setItem('postBuffer','');
            localStorage.setItem('counter',0);
            socket.emit('new post', data);   
        }    

        function gotToChatroomsBoard(){
            const data = JSON.parse(localStorage.getItem('user'));
            localStorage.setItem('postBuffer','');
            localStorage.setItem('counter',0);
            socket.emit('go to chatrooms board', data);   
        }
    }

    function refresh(){
        if (localStorage.getItem('counter')==null){
            localStorage.setItem('counter',0);
        }
        if (localStorage.getItem('postBuffer')==null){
            localStorage.setItem('postBuffer','');
        }
        const messageToPost = document.getElementById('messageToPost').value;
        if (messageToPost == "" || localStorage.getItem('counter') > 1){
            history.go(0); //reloads the page  
            localStorage.setItem('counter',0);
        }
        else{
            const counter  = parseInt(localStorage.getItem('counter'));
            localStorage.setItem('counter',counter + 1);
            localStorage.setItem('postBuffer',messageToPost);
        }

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


function moveCursorToEnd(el) {
    if (typeof el.selectionStart == "number") {
        el.selectionStart = el.selectionEnd = el.value.length;
    } else if (typeof el.createTextRange != "undefined") {
        el.focus();
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
    }
}

