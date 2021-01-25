import React from 'react'

export const CardMenu = ({id, children}) => {
    const cardMenuToogle = (id) => {
        document.querySelectorAll("#dropdown")[id].classList.toggle("show");

        window.onclick = function(e) {
            if (!e.target.matches('.dropbtn')) {
                var dropdowns = document.getElementsByClassName("dropdown-content");
                
                for (var i = 0; i < dropdowns.length; i++) {
                  var openDropdown = dropdowns[i];
                  if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                  }
                }
            }
        }
    }
    return (
        <div className="pointer card-menu">
            <i className="fas fa-ellipsis-v dropbtn" onClick={() => cardMenuToogle(id - 1)}></i>
            <div className="dropdown-content-bg">
                <div id="dropdown" className="dropdown-content">
                    {children}
                </div>
            </div>
        </div>
    )
}
