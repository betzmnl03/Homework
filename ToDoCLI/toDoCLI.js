const readline = require("readline");
const fs = require("fs");
const num=process.argv[2];

const rl= readline.createInterface({
    input: process.stdin,   
    output: process.stdout, 
})

let commands='(v)View ● (n)New ● (cX)Complete ● (dX)Delete ● (q)Quit'
console.log(`                       Welcome to TODO CLI!
-------------------------------------------------------------------------------------------------
                 ${commands}`)
let list=[];
rl.on("line",(answer)=>{
    if(answer==='n'){
        newtask();
        
    }
    if(answer === 'v'){
        viewTask();
    }
    if(answer[0] ==='c'){
        completeTask(answer);
    }

    if(answer[0]==='d'){
        deleteTask(answer);
    }

    if(answer==='q'){
        quitApp();
    }
})

/*********To add new task */
const newtask=()=>{
    let emptyBox='[ ]'
    rl.question('What task? \n', (answer2) => {
        list.push(emptyBox+answer2)
        console.log(commands);
      });
}

/******** To view all the tasks added previously *******************/

const viewTask=()=>{
    if(list.length===0){
        console.log('List is empty....')
    }
    else{
        for (let i=0; i<list.length; i++){
            console.log(`${i} ${list[i]}`);
        }
    }

    console.log(commands);   
}


/***************To check the completed task ************************/
const completeTask=(answer)=>{
    let currentList=list[Number(answer[1])]; 
    if(!(answer[1]<list.length)){
        console.log(`Please enter a valid task number`)
    }
    else{
        for(let i=0; i<list.length; i++){
            if(answer[1]===i.toString()){
                let newList = list[i].slice(2)
                list[i]=`[✓${newList}`    
            }     
        }
        console.log(`Completed "${currentList.slice(3)}"`);  
    }
    
    console.log(commands);
}

/***************To delete the task ************************/
const deleteTask=(answer)=>{
    let currentList=list[Number(answer[1])];
    if(!(answer[1]<list.length)){
        console.log(`Please enter a valid task number`)
    }
    else{
        let index=Number(answer[1]);
        list.splice(index,1)
    }
    console.log(`Deleted "${currentList.slice(3)}"`);
    console.log(commands);
}

/*********** quitApp *********/
const quitApp=()=>{
    console.log('See you soon 😄');
    rl.close();
}


