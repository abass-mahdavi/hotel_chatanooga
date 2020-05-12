document.addEventListener('DOMContentLoaded', () => {
    const currenntLocation = location.protocol + '//' + document.domain + ':' + location.port;
    const links = document.getElementById("Flak_navbar_links");
    //check if any user is already created
    if (!localStorage.getItem('user') || localStorage.getItem('user')==="null"){      
        const loginPage = currenntLocation + '/login';        
        const node = document.createElement("LI");
        node.innerHTML = `<a href=${loginPage}>` + "login" + "</a>";
        links.appendChild(node);
    }
    else{
        const chatRoomsPage = currenntLocation + '/chat_rooms';        
        const node1 = document.createElement("LI");
        node1.className = "nav-link";
        node1.innerHTML = `<a href=${chatRoomsPage}>` + "chatrooms " + "</a>";
        links.appendChild(node1);

        const logoutPage = currenntLocation + '/logout';
        const node2 = document.createElement("LI");
        node2.className = "nav-link";
        node2.innerHTML = `<a href=${logoutPage}>` + " logout" + "</a>";
        links.appendChild(node2);

        const node3 = document.createElement("LI");
        node3.className = "nav-link";
        node3.innerHTML = `you are logged in as:  ${JSON.parse(localStorage.getItem('user')).name}`;
        links.appendChild(node3);

    }

});