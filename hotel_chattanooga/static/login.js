document.addEventListener('DOMContentLoaded', () => {
    const INDEX_PAGE = location.protocol + '//' + document.domain + ':' + location.port;
    if (localStorage.getItem('user') != null){
        window.location = INDEX_PAGE ; 
    }
    else {
        document.getElementById('flak_login_form_input').select();

        // Connect to websocket
        const INDEX_PAGE = location.protocol + '//' + document.domain + ':' + location.port;
        var socket = io.connect(INDEX_PAGE);
    
        socket.on('connect', function() {
            document.getElementById('flak_form_button').onclick = registerUser;
            document.onkeydown = verifyKeyAndregisterUser;
        });
    

        socket.on('participant registered', data => {
            if (data == "exisiting_user"){
                alert("username already registered, please choose another usename");
                window.location = INDEX_PAGE + "/login";
            }
            else{
                const participant = JSON.parse(data);
                participant['selected_room'] = "";
                console.log(participant);
                localStorage.setItem('user',JSON.stringify(participant));
                window.location = INDEX_PAGE + '/chat_rooms';  
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
    }
});
