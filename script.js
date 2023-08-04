    const form = document.querySelector(".wrapper form"),
    fullURL = form.querySelector("input"),
    shortenBTN = form.querySelector("button"),
    blueEffect = document.querySelector(".blur-effect"),
    popupBox = document.querySelector(".popup-box"),
    form2 = popupBox.querySelector("form"),
    shortenURL = popupBox.querySelector("input"),
    saveBtn = popupBox.querySelector("button"),
    copyBtn = popupBox.querySelector(".copy-icon"),
    infoBox = popupBox.querySelector(".info-box");

    form.onsubmit = (e) => {
    e.preventDefault(); //preventing form from submitting
    }

    shortenBTN.onclick = () => {
    //Ajax
    let xhr = new XMLHttpRequest(); //creating xhr object
    xhr.open("POST", "php/url-controll.php", true);
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
        let data = xhr.response;
        if (data.length <= 5) {
            blueEffect.style.display = "block";
            popupBox.classList.add("show");

            let domain = "localhost/url/";
            shortenURL.value = domain + data;
            copyBtn.onclick = () =>{
                shortenURL.select();
                document.execCommand("copy");
            }
            form2.onsubmit = (e) => {
                e.preventDefault(); //preventing form from submitting
                }

            //let's work on save btn click
saveBtn.onclick = () =>{
    let xhr2 = new XMLHttpRequest(); //creating xhr object
    xhr2.open("POST", "php/save-url.php", true);
    xhr2.onload = () => {
        if (xhr2.readyState == 4 && xhr.status == 200) {
            let data = xhr2.response;
            if(data == "success"){
                location.reload(); //reload the current page
            }else{
                infoBox.innerText = data;
                infoBox.classList.add("error");
            }
        }
        
        }
        //let's send two data/value from ajax to php
        let short_url = shortenURL.value;
        let hidden_url = data;
        xhr2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr2.send("shorten_url="+short_url+"&hidden_url="+hidden_url);
    }
        } else {
            alert(data);
        }
        
    }
    
}

    //let's send form data to php
    let formData = new FormData(form); //creating new FormData
    xhr.send(formData); //sending form value to php
    }




