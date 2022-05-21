//Уровни.. 
 
const level_1 = {
    letters: [ ["О","Л","Г"], ["П","М","А"], ["С","О","К"] ],
    positions: [[[2, 0], [2, 1], [2, 2]], [[1, 1], [1, 2], [0, 2]], [[1, 0], [0, 0], [0, 1]]]
}
localStorage.setItem('level_1', JSON.stringify(level_1));

const level_2 = {
    letters: [ ["В","О","С"], ["И","Р","А"], ["Л","К","А"] ],
    positions: [[[1, 1], [0, 1], [0, 2], [1, 2]], [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]]]
}
localStorage.setItem('level_2', JSON.stringify(level_2));

const level_3 = {
    letters: [ ["Б", "Е", "М", "Г"], ["Д", "Г", "Ё", "О"], ["И", "В", "Д", "Р"], ["Л", "О", "Т", "С"] ],
    positions: [[[0, 0], [0, 1], [1, 1]], [[0, 2], [1, 2], [2, 2]], [[2, 3], [1, 3], [0, 3]], [[3, 3], [3, 2], [3, 1], [3, 0]], [[2, 1], [2, 0], [1, 0]]]
}
localStorage.setItem('level_3', JSON.stringify(level_3));



let level_4 = ["рыба", "шут", "бой", "луг", "тир"]; 
let level_5 = ["верх", "гора", "стог", "лист"]; 
let level_6 = ["полк", "торт", "бусы", "окно", "тир"]; 
let level_7 = ["душа", "сила", "воск", "зонт"]; 
let level_8 = ["фарш", "гнев", "лифт", "тигр"]; 
let level_9 = ["храм", "дело", "волк", "край"]; 





let level_progress = 0;
let game_progress = 1;
localStorage.setItem('level_progress', JSON.stringify(level_progress));
localStorage.setItem('game_progress', JSON.stringify(game_progress));



let level = JSON.parse(localStorage.getItem(''.concat('level_', game_progress)));





//Создание поля.. 
 
function createTable(size)  
{ 
 let table = document.createElement('table'); 
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
let table = createTable(level.letters.length); 
 
 
 
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
filling(level.letters); 
 
 
 
//Взаимодействие.. 
 
let check = false; 
let arr_of_bars = []; 
 
//mouse___DOWN

function color_1(event) 
{ 
    check = true; 
    if (event.target.classList.contains("bar") && event.target.classList.contains("colored") == false) 
    {   
        event.target.style = "background-color: #ff976b; font-size: 70px"; 
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
            event.target.style = "background-color: #ff976b; font-size: 70px"; 
            event.target.classList.add("active");
            arr_of_bars.push(event.target); 
        }
    }  
} 

//mouse___UP

function color_3() 
{ 
    check = false; 
    if (checking(level.letters, level.positions)) 
    { 
        for (i in arr_of_bars) 
        { 
            arr_of_bars[i].style = "background-color: #72a7fc"; 
            arr_of_bars[i].classList.add("colored");
            arr_of_bars[i].classList.remove("active");
        } 
        level_progress++;
        localStorage.setItem('level_progress', JSON.stringify(level_progress));
        if (level_progress == level.positions.length)
        {
            let bars = document.getElementsByClassName('bar');            
            let index = 0; let timer = 1000;
            for (let i = 0; i < bars.length; i++)
            {
                var intervalId = setInterval(function() {
                    if (index >= bars.length) return clearInterval(intervalId);
                    bars[index].style = "background-color: #00A86B";  
                    index++;
                  }, timer);
                  timer -= 50;     
            }
            level_progress = 0;
            game_progress++;
            localStorage.setItem('game_progress', JSON.stringify(game_progress));
        }
        localStorage.setItem('level_3', JSON.stringify(level_3));
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
 
table.addEventListener('mousedown', color_1);   
document.addEventListener('mouseover', color_2);   
document.addEventListener('mouseup', color_3);

