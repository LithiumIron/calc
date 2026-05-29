

const display = document.getElementById("display")

let justCalculated=false;

function appendToDisplay(input){
    if(display.value=="Error")
        clearDisplay();

    const isOperator = ['+', '-', '*', '/', '**', '^', '(', ')','√','π'].includes(input);

    if(justCalculated==true){
        if(!isOperator)
            clearDisplay();
        justCalculated=false;
    }
    display.value +=input;
}

function clearDisplay(){
    display.value="";
    justCalculated=false;
}

function calculate(){
    try{
        let ans=display.value;
        ans = ans.replace(/\^/g, '**')
        ans = ans.replace(/π/g, Math.PI)

        ans = ans.replace(/(\d+)√(\d+)/g, '$1*Math.sqrt($2)'); // 2√9
        ans = ans.replace(/√(\d+)/g, 'Math.sqrt($1)');  // √9, √16, √25
        ans = ans.replace(/√\(/g, 'Math.sqrt(');    // √(9), √(2+2)

        display.value=eval(ans);
        justCalculated=true;
    }
    catch(error){
        display.value= "Error";
        justCalculated=true;
    }
    
}

const { ipcRenderer } = require('electron');

function closeApp(){
    window.close();
}

function minimizeApp(){
    ipcRenderer.send('minimize-app');
}

// Add this after your display variable
document.addEventListener('keydown', handleKeyboardInput);

function handleKeyboardInput(event) {
    const key = event.key;

     const allButtons = document.querySelectorAll('button');
    allButtons.forEach(btn => {
        // Match button text to key
        if ((btn.innerText === key && key.length === 1) ||
            (key === 'Enter' && btn.innerText === '=') ||
            (key === 'NumpadEnter' && btn.innerText === '=')) {
            btn.style.backgroundColor = 'rgb(255, 200, 210)';
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.backgroundColor = '';
                btn.style.transform = '';
            }, 100);
        }
    });
    
    // Numpad numbers have different codes
    switch(key) {
        case '0': case 'Numpad0': appendToDisplay('0'); break;
        case '1': case 'Numpad1': appendToDisplay('1'); break;
        case '2': case 'Numpad2': appendToDisplay('2'); break;
        case '3': case 'Numpad3': appendToDisplay('3'); break;
        case '4': case 'Numpad4': appendToDisplay('4'); break;
        case '5': case 'Numpad5': appendToDisplay('5'); break;
        case '6': case 'Numpad6': appendToDisplay('6'); break;
        case '7': case 'Numpad7': appendToDisplay('7'); break;
        case '8': case 'Numpad8': appendToDisplay('8'); break;
        case '9': case 'Numpad9': appendToDisplay('9'); break;
        case '+': appendToDisplay('+'); break;
        case '-': appendToDisplay('-'); break;
        case '*': appendToDisplay('*'); break;
        case '/': appendToDisplay('/'); break;
        case '.': case 'NumpadDecimal': appendToDisplay('.'); break;
        case 'Enter': case 'NumpadEnter': calculate(); break;
        case 'Escape': clearDisplay(); break;
        case 'Backspace': deleteLast(); break;
        case '^': appendToDisplay('^'); break;
    }
}


function deleteLast() {
    display.value = display.value.slice(0, -1);
}
