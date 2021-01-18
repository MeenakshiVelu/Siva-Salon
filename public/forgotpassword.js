    
    const pwd_btn = document.getElementById("pwd_btn");
    const email_btn = document.getElementById("email_btn");
    const password = document.getElementsByClassName("password");

    // console.log(typeof(emailval));


    email_btn.addEventListener("click", () => {

        const emailval = document.getElementById("email").value;

        const options1 = {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded'
            },

            body: JSON.stringify({ email: emailval }),
        };

        fetch("/users/forgotpassword", options1)
            .then((response) => response.json())
            .then((data) => {
                // console.log(error_msg)
                console.log(data.msg);
                if (data.msg === "Success") {
                    Array.from(password).forEach((x) => {
                        x.style.visibility = "visible";
                    });

                    pwd_btn.style.visibility = "visible";
                    email_btn.style.visibility = "hidden";
                }
                else{
                    window.location.href = window.location.origin + '/users/forgotpassword';

                }
            });
    });


    pwd_btn.addEventListener("click", async () => {

        const emailval = document.getElementById("email").value;

        const pwd = document.getElementById("pwd").value;
        console.log("kjhkhk", pwd);

        const val = { email: emailval, password: pwd };

        const options2 = {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded'
            },

            body: JSON.stringify(val),
        };

        //     fetch(`/users/forgotpassword/:${emailval}`, options2)
        //         .then((response) => response.text())
        //         .then((data) => {
        //             // console.log(error_msg);
        //             // console.log(res.success_msg);
        //             console.log(data.msg);
        //         });
        // });

        //  const resp = await fetch(`/users/forgotpassword/:${emailval}`, options2);
        //  const a = await resp.blob();
        //  console.log(a);

        $.ajax({
            type: 'PUT',
            url: '/users/forgotpassword',
            contentType: 'application/json',
            data: JSON.stringify(val) // access in body
        }).done(function (response) {
                if (response.result == 'redirect') {
                    //redirecting to main page from here.
                    // window.location.replace(response.url);
                    window.location.href = window.location.origin + '/users/login';
                
            }
        })
        




    })



   
