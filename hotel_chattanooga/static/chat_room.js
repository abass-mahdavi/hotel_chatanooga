document.addEventListener('DOMContentLoaded', function() {

    const participant_name = JSON.parse(localStorage.getItem('user')).name;
    self_chat_style("." + participant_name);
    concierge_chat_style(".Concierge");

    panel = document.getElementById('postsPanel');
    panel.scrollTop = panel.scrollHeight;
    // Connect to websocket
    const socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    socket.on('connect', () => {
        // Each button should emit a "submit vote" event
        document.getElementById('flak_post_message_button').onclick = () => {   
            const new_post = document.getElementById('messageToPost').value;
            const data = JSON.parse(localStorage.getItem('user'));
            data['post'] = new_post;
            socket.emit('new post', data);   
        }
    });


    // When a new vote is announced, add to the unordered list
    socket.on('post received', data => {
        if (document.getElementById('flak_room_name').dataset.room == data){
            history.go(0); //reloads the page      
        }
    });
    

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
        elements[i].style.color = "Magenta";
        elements[i].style.textAlign = "center";        
    }
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
