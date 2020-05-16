document.addEventListener('DOMContentLoaded', () => {

    // Connect to websocket
    const INDEX_PAGE = location.protocol + '//' + document.domain + ':' + location.port;
    var socket = io.connect(INDEX_PAGE);

    socket.on('connect', function() {
        document.getElementById('flak_form_button').onclick = registerUser;
        document.onkeydown = verifyKeyAndregisterUser;
    });

    // When a new vote is announced, add to the unordered list
    socket.on('participant registered', data => {
        if (data == "exisiting_user"){
            alert("username already registered, please choose another usename");
            login = INDEX_PAGE + '/login';  
            url_redirect(login);
        }
        else{
            const participant = JSON.parse(data);
            participant['selected_room'] = "";
            console.log(participant);
            localStorage.setItem('user',JSON.stringify(participant));
            chat_rooms = INDEX_PAGE + '/chat_rooms';  
            url_redirect(chat_rooms);
        }


    });


function verifyKeyAndregisterUser(pressedKey){
    if (pressedKey.key === "Enter") {
        pressedKey.preventDefault();
        registerUser();
    }
}

function registerUser(){
    const name = document.getElementById('flak_login_form_input'); 
    if (name.value.replace(/\s/g, '')  != ""){           
        socket.emit('register participant', {'name': name.value});        
    }
}



});

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