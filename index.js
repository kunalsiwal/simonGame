var userInputs=[]
var gameColors=[]
var started =false
var level=0

//click event

var buttons=document.getElementsByClassName('btn')

document.addEventListener('keypress',()=>{
    
    if(!started){
        started=true
        console.log('game started')
        levelUp()
    }
    
})

for(let i=0;i<buttons.length;++i){
    buttons[i].addEventListener('click',(e)=>{
        let color=e.target.id
        pressedAnimation(color)
        playAudio(color)
        userInputs.push(color)
        checkAnswer(userInputs.length-1)
    })
}

function checkAnswer(index){
    if(gameColors[index]==userInputs[index]){
        if(gameColors.length==userInputs.length){
            setTimeout(()=>{
                levelUp()
            },2000)
        }
    }
    else{
        playAudio('wrong')
        document.querySelector('body').classList.add('game-over')
        document.getElementById('level-title').innerHTML='Game Over'
        setTimeout(()=>{
            document.querySelector('body').classList.remove('game-over')
            
        },200)
        startOver()
    }
}

function levelUp(){
    level++
    getSequence()
    userInputs=[]
    document.getElementById('level-title').innerHTML=`Level ${level}`
    pressedAnimation(gameColors[gameColors.length-1])
}
function getSequence(){
    let newRandomNumber=Math.random()
    newRandomNumber=newRandomNumber*3+1
    newRandomNumber=Math.round(newRandomNumber)
    let randomColor
    switch (newRandomNumber) {
        case 1:
            randomColor='green'
            break;
        case 2:
            randomColor='red'
            break
        case 3:
            randomColor='yellow'
            break
        case 4:
            randomColor='blue'
            break
    
        default:
            break;

    }
    console.log(randomColor)
    gameColors.push(randomColor)
}

function pressedAnimation(color){

    document.getElementById(color).classList.add('pressed')
    setTimeout(()=>{
        document.getElementById(color).classList.remove('pressed')
    },100)
}

function playAudio(color){
    let audio=new Audio(`./sounds/${color}.mp3`)
    audio.play()
}

function startOver(){
    started=false
    userInputs=[]
    gameColors=[]
    level=0
}