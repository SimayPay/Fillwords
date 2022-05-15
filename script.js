//Уровни.. 
 
let level_1 = [ ["о","л","г"], 
                ["п","м","а"], 
                ["с","о","к"] ]; 
let level_1v = [[[2, 0], [2, 1], [2, 2]], [[1, 1], [1, 2], [0, 2]], [[1, 0], [0, 0], [0, 1]]]; 
                
 
let level_2 = ["роса", "вилка"]; 
let level_3 = ["бег", "вид", "стол", "мёд", "рог"]; 
let level_4 = ["рыба", "шут", "бой", "луг", "тир"]; 
let level_5 = ["верх", "гора", "стог", "лист"]; 
let level_6 = ["полк", "торт", "бусы", "окно", "тир"]; 
let level_7 = ["душа", "сила", "воск", "зонт"]; 
let level_8 = ["фарш", "гнев", "лифт", "тигр"]; 
let level_9 = ["храм", "дело", "волк", "край"]; 
 
 
 
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
            bar.className = "bar"; 
            col.appendChild(bar); 
        } 
    } 
 return table; 
} 
let table = createTable(level_1.length); 
 
 
 
//Заполнение поля.. 
 
function filling(level) 
{ 
    let trs = document.querySelectorAll('table tr'); 
 
    for (let i = 0; i < trs.length; i++) { 
        let tr = trs[i]; 
        let tds = tr.querySelectorAll('td'); 
         
        for (let j = 0; j < tds.length; j++) { 
            let td = tds[j]; 
            td.querySelector('.bar').textContent = level[i][j]; 
        } 
    } 
} 
filling(level_1); 
 
 
 
//Взаимодействие.. 
 
let check = false; 
let arr_of_bars = []; 
 
function color_1(event) 
{ 
    check = true; 
    if (event.target.classList.contains("bar") && event.target.classList.contains("colored") == false) 
    {   
        event.target.style = "background-color: #ff976b; font-size: 120px"; 
        event.target.classList.add("active");
        arr_of_bars.push(event.target); 
    } 
} 
 
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
            event.target.style = "background-color: #ff976b; font-size: 120px"; 
            event.target.classList.add("active");
            arr_of_bars.push(event.target); 
        }
    }  
} 
 
function color_3() 
{ 
    check = false; 
    if (checking(level_1, level_1v) == true) 
    { 
        for (i in arr_of_bars) 
        { 
            arr_of_bars[i].style = "background-color: #72a7fc"; 
            arr_of_bars[i].classList.add("colored");
            arr_of_bars[i].classList.remove("active");
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
 
table.addEventListener('mousedown', color_1);   
document.addEventListener('mouseover', color_2);   
document.addEventListener('mouseup', color_3);