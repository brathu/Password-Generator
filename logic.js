//Made with ❤️ by brathu :)
//Sorry guys, i hate it to comment code
var slider = document.getElementById('slider');
var output = document.getElementById('val');
var passLabel = document.getElementById('pass');
var menue = document.getElementById('menue');
var settingsMenue = document.getElementById('setmen');
var saveMenue = document.getElementById('savemen');
var service = document.getElementById('serviceInp');
var emailOrUser = document.getElementById('emailOrUserInp');
var passInp = document.getElementById('passInp');
var listMenue = document.getElementById('listMenue')
var check = false;

slider.oninput = () => {
    output.innerHTML = slider.value;
}

function settingsMen() {
    if(settingsMenue.style.display == 'none') {
        saveMenue.style.display = 'none';
        settingsMenue.style.display = 'block';
    } else {
        settingsMenue.style.display = 'none';
        menue.style.display = 'block';
    }
}

function generate() {
    var length = slider.value,
        charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789~!@#$%^&*_-+=`|\(){}[]:;<>,.?/',
        retVal = '';
    
    if(length < 6){
        console.log('The length must be over 5!')
        pass.innerHTML = 'The length must be over 5!'
    } else {
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        passLabel.innerText = retVal;
        passInp.value = retVal;
    }
    
    
}

function passToClipboard() {
    window.navigator.clipboard.writeText(passLabel.innerText).then(() => {
        console.log('Password was passed to your clipboard')
    }, () => {
        console.log('Something went wrong...')
    })
}

function saveMen() {
    if(saveMenue.style.display == 'none') {
        settingsMenue.style.display = 'none';
        saveMenue.style.display = 'block';
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true, 'currentWindow': true}, function (tabs) {
            var url = tabs[0].url;
            service.value = url.split('.')[1];
        });

    } else {
        saveMenue.style.display = 'none';
    }
}

function save() {
    console.log('test')
    var serv = service.value.charAt(0).toUpperCase() + service.value.slice(1)
    var block = `[${serv}]\nEmail/Username: ${emailOrUser.value}\nPassword: ${passInp.value}\n-------------------------------------\n`
    window.navigator.clipboard.writeText(block).then(() => {
        console.log('Password was passed to your clipboard')
    }, () => {
        console.log('Something went wrong...')
    })
}

function clearWhoeList() {
    chrome.storage.local.clear( () => {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });
}

//Button Listener
document.getElementById("settings").addEventListener("click", settingsMen);
document.getElementById('copy').addEventListener('click', passToClipboard);
document.getElementById("gen").addEventListener("click", generate);
document.getElementById('copyToSave').addEventListener('click', saveMen)
document.getElementById('save').addEventListener('click', save)
