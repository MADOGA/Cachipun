
const login = document.getElementById('login');
const loginContainer = document.getElementById('loginContainer')
const user = document.getElementById('user');
const password = document.getElementById('password');
const playerImg = document.getElementById('playerImg');
const comImg = document.getElementById('comImg');
const interfaceScore = document.getElementById('score');
const gamePoints = document.getElementById('gamePoints');
const cardsP2 = [
    {
        name: 'Papel',
        img: './pics/right-pp.jpeg'
    }, 
    {
        name: 'Tijeras',
        img: './pics/right-sc.jpeg'
    }, 
    {
        name: 'Piedra',
        img: './pics/right-st.jpeg'
    }];

let score = 0;
let match = 0;
const historicalScore = [];


const validarLogin = () =>{
    if(user.value==='User' && password.value==='1234'){
        console.log('ok')
        loginContainer.classList.toggle('display');
        let historicalData = localStorage.getItem('historialList').split(",");
        for(let i=0; i<5; i++){
            if(historicalData[i]===undefined){
                historicalScore.push(0);
            }else{
                historicalScore.push(historicalData[i]);
            }
        }

        gamePoints.innerHTML = `
        <li>${historicalScore[0]}</li>
        <li>${historicalScore[1]}</li>
        <li>${historicalScore[2]}</li>
        <li>${historicalScore[3]}</li>
        <li>${historicalScore[4]}</li>
        `


    }else {
        alert('Usuario/clave incorrectos o no has rellenado todos los campos')
    }
}

login.addEventListener('submit', (e) => {
    e.preventDefault();
})
//SELECCIONA DE MANERA ALEATORIA LA OPCION DEL COM
const handleRandom = () => {
    const randomPick = Math.floor(Math.random() * 3);
    return cardsP2[randomPick];
}
//SELECCION DEL USUARIO(P1)
const playStone = () => {
    playerImg.src="./pics/left-st.jpeg";
    const comPick = handleRandom();
    comImg.src=comPick.img;
    match = match + 1;
    if (comPick.name === 'Tijeras'){
        score = score + 100;
        console.log('Ganaste')
    }else if (comPick.name === 'Piedra'){
        console.log('Empate')
    } else {
        score = score - 30;
        console.log('Perdiste')
    }
    interfaceScore.innerHTML = score; 
    matchControl();
}

const playScissor = () => {
    playerImg.src="./pics/left-sc.jpeg";
    const comPick = handleRandom();
    comImg.src=comPick.img;
    match = match + 1;
    if(comPick.name === 'Papel'){
        score = score + 100;
        console.log('Ganaste')
    }else if (comPick.name === 'Tijeras'){
        console.log('Empate')
    }else{
        score = score - 30; 
        console.log ('Perdiste')
    }
    interfaceScore.innerHTML = score; 
    matchControl();
}

const playPaper = () => {
    playerImg.src="./pics/left-pp.jpeg";
    const comPick = handleRandom();
    comImg.src=comPick.img;
    match = match + 1; 
    if (comPick.name === 'Piedra'){ 
        score = score + 100; 
        console.log('Ganaste')
    }else if (comPick.name === 'Papel'){ 
        console.log('Empate')
    }else { 
        score = score - 30; 
        console.log ('Perdiste')
    }
    interfaceScore.innerHTML = score; 
    matchControl();
}

//CONTROLA LA CANTIDAD MAXIMA DE JUEGOS  Y GUARDA PUNTAJES 
const matchControl = () => {
    if (match === 10) {
        console.log(score);
        historicalScore.unshift(score); //EL ULTIMO JUEGO SE GUARDA PRIMERO EN EL ARREGLO
        score = 0;
        match = 0;
    }
    lastGameScores();
}
const gameNumber = localStorage.length;


//MUESTRA ULTIMOS 5 PUNTAJES JUGADOS
const lastGameScores = () => {
    const historicalShow=[];
    for(let i = 0; i < 5; i++){
       if (historicalScore[i]===undefined){
           historicalShow[i] = 0
       }else {
           historicalShow[i]=historicalScore[i]
       }
    }
    //SALVAR HISTORIAL EN LOCAL STORAGE 
    localStorage.setItem('historialList', historicalScore);

    gamePoints.innerHTML = `
        <li>${historicalShow[0]}</li>
        <li>${historicalShow[1]}</li>
        <li>${historicalShow[2]}</li>
        <li>${historicalShow[3]}</li>
        <li>${historicalShow[4]}</li>
    `
}

const logout = () => {
    localStorage.clear();
    location.reload();
}










