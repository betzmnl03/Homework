#! /usr/bin/env node
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
// console.log(boxIt(['Jon Snow', 'Cersei Lannister']))
// console.log(boxIt(['Jon Snow']))
// console.log(boxIt([]))

console.log(boxIt(input))