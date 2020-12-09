'use strict';
const readline = require("readline");
const fs = require('fs');
const { listenerCount } = require("process");
const num=process.argv[2];
let defaultPath = process.argv[2];
const rl= readline.createInterface({
    input: process.stdin,   
    output: process.stdout, 
})
/*************************to parse the json file ********************/
let list=[];
const readingJson=()=>{
    let rawdata = fs.readFileSync(num);
    let student = JSON.parse(rawdata);
    for(let key in student){
        if(student[key]['completed']===true){
            list.push(`[✓] ${student[key]['title']}`)
        }
        else{
            list.push(`[ ] ${student[key]['title']}`)
        }
    }

}
/*************To check whether the input json file is given ****************/
if(process.argv[2]!==undefined){
    readingJson();
    
}

let commands='(v)View ● (n)New ● (cX)Complete ● (dX)Delete ● (s)Save ● (q)Quit'
console.log(`                       Welcome to TODO CLI!
-------------------------------------------------------------------------------------------------
                 ${commands}`)
//let list=[];
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

    if(answer==='s'){
        saveApp();
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
        //console.log(index)
        list.splice(index,1)
        console.log(`Deleted "${currentList.slice(3)}"`);
    }
    
    console.log(commands);
}

/*********** quitApp *********/
const quitApp=()=>{
    console.log('See you soon 😄');
    rl.close();
}

/*********** Save the list *********/

const saveApp=()=>{
    let final=[];
    
    for(let i=0; i<list.length;i++){
        let obj={};
        if(list[i].includes('✓')){
            obj['completed']=true;
        }
        else{
            obj['completed']=false
        }
        obj['title']=list[i].slice(3)
        final.push(obj)
        
    }
    let data = JSON.stringify(final)
    const otheranswer=()=>{
        rl.question('Where? \n', (answer4) => {
            console.log(answer4)
            if(answer4===''){
                let def ="myList.json";
                fs.writeFileSync(def, data);
                console.log(`List saved to "${def}"`)
            }
            else{
                if(answer4.includes('.json')){
                    fs.writeFileSync(answer4, data);
                    console.log(`List saved to "${answer4}"`)
                }
                else{
                    let ext= answer4+'.json'
                    fs.writeFileSync(ext, data);
                    console.log(`List saved to "${ext}"`)
                }
            }

            
            console.log(commands);
    });
    }
    if(defaultPath!=undefined){
        rl.question(`Where (${defaultPath})? y/n`,(answer3)=>{
            if(answer3==='' || answer3==='y'){
                fs.writeFileSync(defaultPath, data);
                console.log(`List saved to "${defaultPath}"`)
                console.log(commands);
            }
            else{
                //console.log
                otheranswer();
        }
        })
    }
    else{
       otheranswer();
    }
}

