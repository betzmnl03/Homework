#! /usr/bin/env node
const fs=require('fs');
const { type } = require('os');

let input=process.argv.slice(2);

const drawLine=(num)=>{
    let mult='';
    for(let i=0; i<num; i++){
        mult=mult+'━'
    }
   return mult
}
const draw=(left,right,num)=>{
    let arg=num-2;
    return left+drawLine(arg)+right
}

const drawtopBorder=(num)=>{
    return draw("┏","┓",num)
}

const drawBottomBorder=(num)=>{
    return draw('┗','┛',num)
}

const drawMiddleBorder=(num)=>{
    return draw('┣','┫',num)
}

const drawBarsAround=(str)=>{
       return `┃${str}┃`;
}


const boxIt=(arr)=>{
    let len=[];
    let array=[];
    if(arr.length===0){
        return drawtopBorder(0)+'\n'+drawBottomBorder(0)
    }
    arr.forEach(item => {
        len.push(item.length)
     });
    let max=Math.max(...len)+2;
    array.push(drawtopBorder(max))
    for(let i=0;i<arr.length;i++){
        array.push(drawBarsAround(arr[i]))
        array.push(drawMiddleBorder(max))
    }
    array[array.length-1]=drawBottomBorder(max);

   return array.join("\n").toString();
}


if(input[0].includes('.csv')){

    fs.readFile(input[0],{encoding:"utf8"}, (err,data)=>{
        if(err) throw err;
        let newstring = data.replace(/([,]+)/g, "┃")
        //console.log(newstring)
        let outArr=newstring.split("\n\n");
        //console.log(outArr)
        console.log(boxItCsv(outArr))
        
    })
    
}

else{
    console.log(boxIt(input))
}

const boxItCsv=(arr)=>{

    /*****draw top border */
    len=[]
    for(let x of arr){
        len.push(x.length)
    }
   let maxLen=Math.max(...len)+2;
   let half=maxLen/2;
//    ┳
    let item1=draw("┏","━",half)+'┳'+draw("━","┓",half);
    let boxaround=[];
    //boxaround[0]=item1;
    for(let x of arr){
        boxaround.push(`┃${x}┃`)
    }
    //console.log(boxaround)
    let middleBorder=draw('┣','━',half)+'╋'+draw('━','┫',half)
    let bottomBorder=draw("┗","━",half)+'┻'+draw("━","┛",half);
    let output=[];
    output[0]=item1;
    for(let i=0; i<boxaround.length; i++){
        output.push(boxaround[i])
        output.push(middleBorder)
    }
    
    output[output.length-1]=bottomBorder
    return output.join("\n").toString();
    
}
