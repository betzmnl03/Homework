const express = require('express');
const { reset } = require('nodemon');
const { count } = require('../db/client');
const knex = require('../db/client');
const router = express.Router();


router.get('',(req,res)=>{
    res.render('pages/home')
})


//for new cohort
router.get('/new',(req,res)=>{
    res.render('pages/new',{cohort:false})
})

//post from newcohort
router.post('/new',(req,res)=>{
    // console.log(req.body)
    knex('cohorts')
    .insert({
        name:req.body.name,
        members:req.body.members,
        logo_url:req.body.logo
    })
    .returning('*')
    .then((record)=>{
        let cohort=record[0]
        res.redirect(`/cohorts/${cohort.id}`)
    })
    
})

router.get('/index',(req,res)=>{
    knex('cohorts')
    .select('*')
    .then((records)=>{
        res.render('pages/index',{records:records})
    })
})


router.get('/:id',(req,res)=>{ 
    knex('cohorts')
    .select('*')
    .where('id',req.params.id)
    .first()
    .then((record)=>{
        if(record===undefined){
            res.render('pages/show',{id:false})
        }
        else{
            res.render('pages/show',{id:true, cohort:record,details:false, select:"",quantity:""})
        }   
    })
})

router.post('/:id',(req,res)=>{
        let select=req.body.select;
        let quantity=Number(req.body.quantity);
    knex('cohorts')
    .select('*')
    .where('id',req.params.id)
    .first()
    .then((record)=>{
        let memlength=record.members.split(',').length

       let details=team(req.body.select,record.members,req.body.quantity);
 
       res.render('pages/show',{details:details, cohort:record, id:req.params.id, select:select,quantity:quantity, len:memlength})
    })  
})

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }
  
const team=(select,members,quantity)=>{
    members=shuffle(members.split(','))
    let memlength=members.length
    quantity=Number(quantity)
    let div = members.length/quantity//7 7teams => divide length by quantity, take the quotient
    let rem=members.length%quantity
    let outArr=[];
    let last;
    
    if(quantity>0&&quantity<=members.length){
        switch(select){
            case 'count':
                let k=1;
                if(rem>0){
                    let ind=members.length-rem
                    last=members.splice(ind,rem)
                
                }
                else{
                    last=[];
                }
                let divIn=(members.length/quantity)
                    while(k<=quantity){
                        
                        for(let i=0; i<members.length; i+=divIn){
                            outArr.push(members.slice(i,i+divIn))
                            k++;
                        }
                    }
                    if(last.length>0){
                        for(let j=0; j<last.length; j++){
                            outArr[j].push(last[j])
                        }
                    }
                    
                    
                break;
            case 'number':
                if(quantity===1|| quantity===2|| quantity===3 || quantity-members.length>2){
                    // console.log("outArr,",outArr)
                    for(let i=0; i<members.length;i+=quantity){
                        outArr.push(members.slice(i,quantity+i))
                    } 
                   
                }
                else if(rem<=2&&rem>0){
                  
                    let ind=members.length-rem
                    last=members.splice(ind,rem)

                    for(let i=0; i<members.length; i+=quantity){
                        outArr.push(members.slice(i,quantity+i))
                    }
                
                    if(outArr.length===1){
                        
                        for(let j=0; j<last.length; j++){
                            outArr[0].push(last[j])
                        }
                    }
                    else{
                       
                        for(let j=0; j<last.length; j++){
                            outArr[j].push(last[j])
                        }
                    }
                
                }

                else if(rem>2){
                    console.log("2")
                    let div = Math.round(members.length/quantity)
                    let num=members.length/div
                    for(let i=0; i<members.length; i+=num){
                        outArr.push(members.slice(i,num+i)) 
                    }   
                }

                else{
                    // console.log("3")
                    for(let i=0; i<members.length; i+=quantity){
                        outArr.push(members.slice(i,quantity+i)) 
                    }     
                }
        }
    }
    else{
        outArr=[];
    }
    
    return outArr
}

router.get('/:id/edit',(req,res)=>{ 
    knex('cohorts')
    .select('*')
    .where('id',req.params.id)
    .first()
    .then((record)=>{
        res.render('pages/edit',{cohort:record})
        //res.send(record)
    })
})
router.patch('/:id/edit',(req,res)=>{
    knex('cohorts')
    .where('id',req.params.id)
    .update({
        logo_url: req.body.logo,
        name: req.body.name,
        members: req.body.members
      })
    .returning('*')
    .then((record) => {
        res.redirect(`/cohorts/${req.params.id}`); //=== updated values shown
      });
    // res.send(req.body)
})

// DELETE /cohorts/:id
router.delete('/:id', (req, res) => {
    knex('cohorts')
      .where('id', req.params.id)
      .del()
      .then(() => {
        res.redirect('/cohorts/index');  //--get(/posts)
      });
  });

module.exports = router