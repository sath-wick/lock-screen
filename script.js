const keypad = document.getElementById("keypad");
document.addEventListener("DOMContentLoaded", function(){
    for(let i = 1; i <= 9; i++) {
        const key = document.createElement("button");
        key.classList.add("pin-key");
        key.innerHTML = `${i}`;
        key.setAttribute('data-value', `${i}`);
        keypad.insertBefore(key,document.getElementById('zero'));
    }
});
function unlockScreen(){
    container.style.animation = "swipeUp 0.5s ease-in-out 1";
        setInterval(() => {
            container.style.display = "none";
            document.body.style.backgroundImage= "url('src/blur-bg.jpg')";
        }, 450);
        pswdContainer.style.display = "flex";
        pswdContainer.style.animation = "appear 0.5s 0.3s ease-in-out 1";
        console.log("Swiped");

}
const successScreen = document.getElementById('success-screen');
const pswdContainer = document.getElementById("pswd-container");
const container = document.getElementById("container");
const clock = document.getElementById("clock");
const cal = document.getElementById("cal");
const swipebtn = document.getElementById("swipe");
let isSwiped = false;

setTimeout(() => {
    let time = new Date();
    let hours = String(time.getHours() % 12).padStart(2, 0);
    let minutes = String(time.getMinutes()).padStart(2, 0);
    const day = time.toLocaleDateString('en-US', { weekday: 'long' });
    clock.innerText = `${hours}:${minutes}`;
    cal.innerText = `${day}`;
}, 1000);

const hammer = new Hammer(document);

hammer.get('swipe').set({ direction: Hammer.DIRECTION_UP });

hammer.on('swipe', function(e) {
    e.preventDefault();
    if (!isSwiped) {
        isSwiped = true;
        unlockScreen();
    }else{
        console.log("already swiped");
    }
});
const displayPin = document.querySelectorAll(".pin-display");
const passKey = [2,0,0,5];
let keyList = [0, 0, 0, 0];
var keyCount = 0;


document.addEventListener("DOMContentLoaded", function() {
    const keys = document.querySelectorAll(".pin-key");

    keys.forEach(function(key) {
        key.addEventListener('click', function() {
            displayPin[keyCount].classList.add('pin-active');
            console.log(keyCount, this.dataset.value);
            keyList[keyCount] = this.dataset.value;
            keyCount=keyCount+1;
            if(keyCount===4){
                if(keyList.toString() === passKey.toString()){
                    console.log("success");
                    keyCount = 0;
                    pswdContainer.style.display = 'none';
                    successScreen.style.display = 'flex';
                }
                else{
                    keyList=[0,0,0,0];
                    console.log("failed");
                    try{
                    navigator.vibrate(80);
                    }
                    catch(e){
                        console.log("Vibration works only for mobile devices");
                    }
                    document.getElementById("pswd-display").style.animation = "wrongPin 0.2s ease-in-out 1";
                    setTimeout(()=>{
                        document.getElementById("pswd-display").style.animation = '';
                    },300);
                    document.getElementById('err-msg').style.display = 'block';
                    keyCount = 0;
                }
                displayPin.forEach(function(pin){
                    pin.classList.remove('pin-active');
                });
            }
        });
    });
});
