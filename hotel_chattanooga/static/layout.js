
document.addEventListener('DOMContentLoaded', () => {
    secondLinkItem = document.getElementById('flak_navbar_second_item');
    if (localStorage.getItem('user') == null)
    {        
        secondLinkItem.innerHTML = "Please login";
        secondLinkItem.style.color = "Magenta";
        
    }
    else
    { 
        secondLinkItem .innerHTML = `you are logged in as:  ${JSON.parse(localStorage.getItem('user')).name}`;
        secondLinkItem.style.color = "Aquamarine";
    }
    secondLinkItem.style.marginLeft = "50px";

});