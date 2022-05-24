//Уровни.. 
 
const arr_of_levels = [];

arr_of_levels[0] = {
    letters: [ ["О","Л","Г"], ["П","М","А"], ["С","О","К"] ],
    positions: [[[2, 0], [2, 1], [2, 2]], [[1, 1], [1, 2], [0, 2]], [[1, 0], [0, 0], [0, 1]]]
}

arr_of_levels[1] = {
    letters: [ ["В","О","С"], ["И","Р","А"], ["Л","К","А"] ],
    positions: [[[1, 1], [0, 1], [0, 2], [1, 2]], [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]]]
}

arr_of_levels[2] = {
    letters: [ ["Б", "Е", "М", "Г"], ["Д", "Г", "Ё", "О"], ["И", "В", "Д", "Р"], ["Л", "О", "Т", "С"] ],
    positions: [[[0, 0], [0, 1], [1, 1]], [[0, 2], [1, 2], [2, 2]], [[2, 3], [1, 3], [0, 3]], [[3, 3], [3, 2], [3, 1], [3, 0]], [[2, 1], [2, 0], [1, 0]]]
}


let level_4 = ["рыба", "шут", "бой", "луг", "тир"]; 
let level_5 = ["верх", "гора", "стог", "лист"]; 
let level_6 = ["полк", "торт", "бусы", "окно", "тир"]; 
let level_7 = ["душа", "сила", "воск", "зонт"]; 
let level_8 = ["фарш", "гнев", "лифт", "тигр"]; 
let level_9 = ["храм", "дело", "волк", "край"]; 


let game_progress; //текущий уровень
let level_progress; //количество найденных слов на уровне
let table;
let check = false; 
let arr_of_bars = []; 




function process()
{
    table = createTable(arr_of_levels[game_progress].letters.length); 
    filling(arr_of_levels[game_progress].letters); 
    table.addEventListener('mousedown', color_1);   
    document.addEventListener('mouseover', color_2);   
    document.addEventListener('mouseup', color_3);
}



function start()
{
    level_progress = 0;
    if (localStorage.getItem('game_progress') === null) 
    {
        game_progress = 0;
        localStorage.setItem('game_progress', JSON.stringify(game_progress));
    }
    else 
    {
        game_progress = JSON.parse(localStorage.getItem('game_progress', game_progress));
    }
    process(game_progress);
}

start();



//Создание поля.. 
 
function createTable(size)  
{ 
    table = document.querySelector('.table');
    if (table != null)
    {
        table.remove();
    }
    table = document.createElement('table'); 
    table.classList.add("table");
    document.getElementById('container').prepend(table); 
    
    for (let i = 0; i < size; i++) 
        { 
            let row = document.createElement('tr') 
            table.appendChild(row); 
    
    for (let j = 0; j < size; j++)  
            { 
                let col = document.createElement('td') 
                row.appendChild(col); 
                let bar = document.createElement('div'); 
                bar.classList.add("bar");
                col.appendChild(bar); 
            }  
        } 
    return table; 
} 
 
 
 
//Заполнение поля.. 
 
function filling(level) 
{ 
    let trs = document.querySelectorAll('table tr'); 
    for (let i = 0; i < trs.length; i++) 
    { 
        let tr = trs[i]; 
        let tds = tr.querySelectorAll('td'); 
        for (let j = 0; j < tds.length; j++) 
        { 
            let td = tds[j]; 
            td.querySelector('.bar').textContent = level[i][j]; 
        } 
    } 
} 
 
  

//mouse___DOWN

function color_1(event) 
{ 
    check = true; 
    if (event.target.classList.contains("bar") && event.target.classList.contains("colored") == false) 
    {   
        event.target.style = "background-color: #D2E0DB; color: #012F2C; font-size: 70px"; 
        event.target.classList.add("active");
        arr_of_bars.push(event.target); 
    } 
} 
 
//mouse___OVER

function color_2(event) 
{ 
    if (check && event.target.classList.contains("bar") && event.target.classList.contains("colored") == false) 
    {  
        if (event.target.classList.contains("active"))                
        {
            for (let i = arr_of_bars.indexOf(event.target)+1; i < arr_of_bars.length; i++)
            {
                arr_of_bars[i].style = "";
                arr_of_bars[i].classList.remove("active");
            }
            arr_of_bars.splice(arr_of_bars.indexOf(event.target)+1, arr_of_bars.length-1 - arr_of_bars.indexOf(event.target));
        }
        else 
        {
            event.target.style = "background-color: #c3d6cf; color: #012F2C; font-size: 70px"; 
            event.target.classList.add("active");
            arr_of_bars.push(event.target); 
        }
    }  
} 

//mouse___UP

const arr_of_colors = ["#2c9585", "#92cdb6", "#a6b15f", "#535e66", "#c9b675"]
let colors = arr_of_colors.slice();

function color_3() 
{ 
    check = false; 
    if (checking(arr_of_levels[game_progress].letters, arr_of_levels[game_progress].positions)) 
    { 
        let color = colors[Math.floor(Math.random() * colors.length)];
        colors.splice((Math.floor(Math.random() * colors.length)), 1);
        for (i in arr_of_bars) 
        { 
            arr_of_bars[i].style.backgroundColor = color;
            arr_of_bars[i].style.fontSize = "50px";
            arr_of_bars[i].style.color = "#f8f8f8";
            arr_of_bars[i].classList.add("colored");
            arr_of_bars[i].classList.remove("active");
        } 
        level_progress++;
        if (level_progress == arr_of_levels[game_progress].positions.length)
        {
            let bars = document.getElementsByClassName('bar');        

            var i = 0;                                                                                    

            function myLoop () {                                                                       
                setTimeout(function () {                                                                          
                    bars[i].style = "background-color: #00A86B";                                          
                    i++;                                                                                                         
                    if (i < bars.length) {                                                                                          
                        myLoop();                                                      
                    }                                                                         
                },50)
            }
            myLoop();  
             
            level_progress = 0;
            game_progress++;
            colors = arr_of_colors.slice();
            localStorage.setItem('game_progress', JSON.stringify(game_progress));
            process();
        }
    } 
    else 
    { 
        for (i in arr_of_bars) 
        { 
            arr_of_bars[i].style = ""; 
            arr_of_bars[i].classList.remove("active");
        } 
    } 
    arr_of_bars = []; 
} 
 
function checking(level, level_v) 
{ 
        for (let i = 0; i < level_v.length; i++) 
        { 
            let letters = 0; 
            if (level_v[i].length == arr_of_bars.length) 
            { 
                for (let j = 0; j < level_v[i].length; j++) 
                { 
                    if (level[level_v[i][j][0]][level_v[i][j][1]] == arr_of_bars[j].textContent) 
                    { 
                        letters++; 
                    } 
                    if (letters == arr_of_bars.length) 
                    { 
                        return true; 
                    } 
                } 
            } 
        }  
        return false; 
} 
 


