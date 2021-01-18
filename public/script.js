const toggle = document.getElementsByClassName("toggle")[0];
const navlinks = document.querySelector(".navlinksme");


toggle.addEventListener("click", ()=>{

    navlinks.classList.toggle("activeme");
})



const li = document.querySelectorAll(".navlinksme li a");
Array.from(li).forEach((el)=>{
                    if(window.location.href === el.href){
                        el.classList.add("active-link");
                    }
     
     
    })




