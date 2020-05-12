document.addEventListener('DOMContentLoaded', () => {

    // Connect to websocket
    const INDEX_PAGE = location.protocol + '//' + document.domain + ':' + location.port;
    var socket = io.connect(INDEX_PAGE);

    socket.on('connect', () => {
        document.getElementById('flak_form_button').onclick = () => {               
            const name = document.getElementById('flak_login_form_input').value;                
            socket.emit('register participant', {'name': name});    
            document.getElementById('flak_login_form_input').value = "";        
        }        
    });

    // When a new vote is announced, add to the unordered list
    socket.on('participant registered', data => {
        const participant = JSON.parse(data);
        localStorage.setItem('user',data);
        chat_rooms = INDEX_PAGE + '/chat_rooms';  
        url_redirect(chat_rooms);

    });

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