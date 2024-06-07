const {pool} = require("../config/dbconfig");
const bcrypt = require('bcrypt');
const passport = require('passport');
const sendMail = require("../middlewares/sendmail");


const getadminLogin = async (req,res) => {
    res.render('admin/adminlogin');
};

const getaddOrderType = async (req,res) => {
    res.render('admin/addordertype');
};

const getadminSignup = async (req,res) => {
    pool.query(
        `SELECT * FROM branches`,
        (err, results) => {
            if (err) {
                throw err;
            }

            const resultsArray = Array.from(results.rows);
            res.render('admin/adminsignup', { results: resultsArray });
        }
    );
};

const getadminDashboard = async (req,res) => {
    pool.query(
        `select * from branches`,
        (err,results)=>{
            if(err){
                throw err;
            }
            const resultsArray = Array.from(results.rows);
            pool.query(
                `select * from ordertype`,
                (err,result)=>{
                    if(err){
                        throw err;
                    }
                    
                    const resultArray = Array.from(result.rows);
                    res.render('admin/admindashboard',{results: resultsArray,result: resultArray});
                }
            );
        }
    );
};
const getaddPizza = async (req,res) => {
   res.render('admin/addpizza');
};

const getaddTopping = async (req,res) => {
    res.render('admin/addtopping');
};

const getaddBranch = async (req,res) => {
    res.render('admin/addbranch');
};

const getReviews = async (req,res) => {
    console.log(req.user);
    await pool.query(
        `select *
        from orders natural join orderpizzatopping
            natural join customers
            natural join ordertype
            natural join branches
            natural join deliveryman
            natural join admins,pizzas,toppings
        where rating is not null and branchid=$1
        and orderpizzatopping.pizzaid=pizzas.pizzaid and orderpizzatopping.toppingid=toppings.toppingid`,[req.user.branchid],
        (err,results)=>{
            if(err){
                throw err;
            }
            const resultsArray = Array.from(results.rows);
            res.render('admin/showreviews',{results: resultsArray});
        }
    );
};

const getshowOrders =async (req,res) => {
    console.log(req.user);
    pool.query(
        `select *
        from orders natural join orderpizzatopping
            natural join customers
            natural join ordertype
            natural join branches
            natural join admins,pizzas,toppings
        where status=1 and branchid=$1
        and orderpizzatopping.pizzaid=pizzas.pizzaid and orderpizzatopping.toppingid=toppings.toppingid`, [req.user.branchid],
        (err, results) => {
            if (err) {
                throw err;
            }
            const resultsArray = Array.from(results.rows);
            res.render('admin/showorders', { results: resultsArray });
        }
    );
};  

const markDelivered = async (req,res) => {
    let {orderid}=req.body;
    console.log("The orderid name is : "+orderid);
    pool.query(
        `update orders set status=status+1 where orderid=$1`,[orderid],
        (err,results)=>{
            if(err){
                throw err;
            }
            else{
                let no_err=[];
                no_err.push({message:"Payment has been taken and order has been delivered"});
                pool.query(
                    `select *
                    from orders natural join orderpizzatopping natural join customers natural join ordertype natural join branches natural join admins
                    where status=0 and branchid=$1`,[req.user.branchid],
                    (err,results)=>{
                        if(err){
                            throw err;
                        }
                        const resultsArray = Array.from(results.rows);
                        res.render('admin/showorders',{results: resultsArray,no_err});
                    }
                );
            }
        }
    );
  };
  
  const markReady = async (req,res) => {
    let {orderid}=req.body;
    console.log("The orderid name is : "+orderid);
    pool.query(
        `update orders set status=status+1 where orderid=$1`,[orderid],
        (err,results)=>{
            if(err){
                throw err;
            }
            else{
                let no_err=[];
                no_err.push({message:'Order is ready and added to delivery list'});
                pool.query(
                    `select *
                    from orders natural join orderpizzatopping natural join customers natural join ordertype natural join branches natural join admins
                    where status=1 and branchid=$1`,[req.user.branchid],
                    (err,results)=>{
                        if(err){
                            throw err;
                        }
                        const resultsArray = Array.from(results.rows);
                        res.render('admin/showorders',{results: resultsArray,no_err});
                    }
                );
            }
        }
    );
  };
  
  const deleteOrder = async (req,res) => {
    let { orderid } = req.body;
    console.log("The orderid name is : "+orderid);
    pool.query(
        `update orders set status=5 where orderid=$1`,[orderid],
        (err,results)=>{
            if(err){
                throw err;
            }
            else{
                pool.query(
                    `select *
                    from orders natural join orderpizzatopping natural join customers natural join ordertype natural join branches natural join admins
                    where status=1 and branchid=$1`,[req.user.branchid],
                    (err,results)=>{
                        if(err){
                            throw err;
                        }
                        const resultsArray = Array.from(results.rows);
                        res.render('admin/showorders',{results: resultsArray});
                    }
                );
            }
        }
    );
  };
  
  const addBranch = async (req,res) => {
    let {branch}=req.body;
    console.log("The branch name is : "+branch);
    pool.query(
        `select * from branches where branchname=$1`,[branch],
        (err,results)=>{
            if(err){
                throw err;
            }
            else if(results.rows.length>0){
                let error=[];
                error.push({message:"This branch already exists."});
                res.render('admin/addbranch',{error});
            }
            else{
                pool.query(
                    `insert into branches (branchname) values($1)`,[branch],
                    (err,results)=>{
                        if(err){
                            throw err;
                        }
                        else{
                            let no_err=[];
                            no_err.push({message:"Branch Inserted successfully."});   
                            res.render('admin/addbranch',{no_err});
                        }
                    }
                );
            }
        }
    );
  };
  
  const addOrderType = async (req,res) => {
    let {ordertype}=req.body;
    pool.query(
        `select * from ordertype where type=$1`,[ordertype],
        (err,results)=>{
            if(err){
                throw err;
            }
            else if(results.rows.length>0){
                let error=[];
                error.push({message:"This type already exists."});
                res.render('admin/addordertype',{error});
            }
            else{
                pool.query(
                    `insert into ordertype (type) values($1)`,[ordertype],
                    (err,results)=>{
                        if(err){
                            throw err;
                        }
                        else{
                            let no_err=[];
                            no_err.push({message:"Ordetype Inserted successfully."});   
                            res.render('admin/addordertype',{no_err});
                        }
                    }
                );
            }
        }
    );
  };
  
  const addDeliveryMan = async (req,res) => {
    let {name,dtype,hidden_dtype,branch,hidden_branch,phone} = req.body;

    console.log(name,dtype,branch,phone);

    let password = "123";
    let hash=await bcrypt.hash(password,10);

    pool.query(
        `Insert into deliveryman (typeid,name,branchid,phone,password)
        values ($1,$2,$3,$4,$5) returning deliverymanid,typeid,name,branchid,phone`,
        [dtype,name,branch,phone,hash],
        (err,results)=>{
            if(err){
                throw err;
            }
            else{
                let no_err=[];
                no_err.push({message:"Delivery man has been inserted"});
                pool.query(
                    `select * from branches`,
                    (err,results)=>{
                        if(err){
                            throw err;
                        }
                        const resultsArray = Array.from(results.rows);
                        pool.query(
                            `select * from ordertype`,
                            (err,result)=>{
                                if(err){
                                    throw err;
                                }
                                
                                const resultArray = Array.from(result.rows);
                                res.render('admin/admindashboard',{results: resultsArray,result: resultArray,no_err});
                            }
                        );
                    }
                );
            }
        }
    );
  };
  
  const addPizza = async (req,res) => {
    let {pizzaname,details,price} = req.body;

    console.log(pizzaname,details,price);
    
    pool.query(
        `Insert into pizzas (pizzaname, details, price)
        values ($1,$2,$3) returning pizzaname,details,price`,[pizzaname,details,price],
        (err,results)=>{
            if(err){
                throw err;
            }
            else{
                let no_err=[];
                no_err.push({message:"Pizza has been inserted"});
                res.render('admin/addpizza',{no_err});
            }
        }
    );
  };
  
  const addTopping = async (req,res) => {
    let {toppingname,details,price} = req.body;

    console.log(toppingname,details,price);
    
    pool.query(
        `Insert into toppings (toppingname, details, price)
        values ($1,$2,$3) returning toppingname,details,price`,[toppingname,details,price],
        (err,results)=>{
            if(err){
                throw err;
            }
            else{
                let no_err=[];
                no_err.push({message:"topping has been inserted"});
                res.render('admin/addtopping',{no_err});
            }
        }
    );
  };
  
const adminSignup = async (req,res) => {
    let {masterkey,adminname,branchid,adminemail,adminphone,adminpassword,cadminpassword} = req.body;

    console.log(masterkey,adminname,branchid,adminemail,adminphone,adminpassword,cadminpassword);
    
    let error=[];

    if(adminpassword!=cadminpassword){
        error.push({message: "Passwords do not match"});
        pool.query(
            `select * from branches`,
            (err,results)=>{
                if(err){
                    throw err;
                }
                
                const resultsArray = Array.from(results.rows);
                res.render('admin/adminsignup',{results: resultsArray,error});
            }
        );
    }
    else if(masterkey!="1234"){
        error.push({message: "Incorrect masterkey.Please contact authority"});
        pool.query(
            `select * from branches`,
            (err,results)=>{
                if(err){
                    throw err;
                }
                
                const resultsArray = Array.from(results.rows);
                res.render('admin/adminsignup',{results: resultsArray,error});
            }
        );
    }
    else{
        const adminotp = Math.floor(1000 + Math.random() * 9000);

        pool.query(
            `select * from admins where adminemail=$1`,[adminemail],
            (err,results)=>{
                if(err){
                    throw err;
                }
                console.log("database connected");
                console.log(results.rows);

                if(results.rows.length>0){
                    error.push({message: "Email already exists"});
                    pool.query(
                        `select * from branches`,
                        (err,results)=>{
                            if(err){
                                throw err;
                            }
                            
                            const resultsArray = Array.from(results.rows);
                            res.render('admin/adminsignup',{results: resultsArray,error});
                        }
                    );
                }
                else{
                    let message="Your otp varification code is ";
                    let subject="Verify your account";
                    sendMail(adminemail,adminotp,subject,message);
                    res.render('admin/adminregister',{adminname,branchid,adminemail,adminphone,adminpassword,adminotp});
                }
            }
        );
    }
};
  
const adminRegister = async (req,res) => {
    let {adminname,branchid,adminemail,adminphone,adminpassword,adminotp,adminvarcode} = req.body;
    let error=[];
    if(adminotp!=adminvarcode){
        error.push({message:"Invalid varification code"});
        res.render("admin/adminregister",{error});
    }
    else{
        let hash=await bcrypt.hash(adminpassword,10);
        console.log(hash);
        pool.query(
            `INSERT INTO admins (adminname,branchid,adminemail,adminphone,adminpassword)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING adminname,branchid,adminemail,adminphone,adminpassword`,
            [adminname,branchid,adminemail,adminphone,hash],
            (err, results) => {
            if (err) {
                throw err;
            }
                console.log(results.rows);
                console.log("Data inserted");
                req.flash("success_msg", "You are now registered admin. Please log in");

                let no_err=[];
                no_err.push({message:"Account created. You can log in now as an admin"});
                res.render("admin/adminlogin",{no_err});
            }
        );
    }
};
  
const adminLogin = passport.authenticate("admin", {
    successRedirect: "/admin/admindashboard",
    failureRedirect: "admin/adminlogin",
    failureFlash: true
});

const deleteBranch = async (req,res) => {
    let {branchid}=req.params;
    console.log("The branchid name is : "+branchid);
    pool.query(
        `delete from branches where branchid=$1`,[branchid],
        (err,results)=>{
            if(err){
                throw err;
            }
            else{
                let no_err=[];
                no_err.push({message:"Branch has been deleted"});
                res.json({no_err});
            }
        }
    );
}

const putbranch = async(req,res)=>{
    let {branchname}=req.params;
    pool.query(
        `insert into branches (branchname) values ($1)`,[branchname],
        (err,results)=>{
            if(err){
                throw err;
            }
            else{
                let no_err=[];
                no_err.push({message:"Branch has been added"});
                res.json({no_err});
            }
        }
);
}   

const updatebranch = async(req,res)=>{
    let {branchid,branchname}=req.params;
    console.log(branchid,branchname);  
    //check if branch exists
    pool.query(
        `select * from branches where branchid=$1`,[branchid],
        (err,results)=>{
            if(err){
                throw err;
            }
            else if(results.rows.length==0){
                let error=[];
                error.push({message:"Branch does not exist"});
                res.json({error});
            }
            else if(results.rows.length>0){
                pool.query(
                    `update branches set branchname=$1 where branchid=$2`,[branchname,branchid],
                    (err,results)=>{
                        if(err){
                            throw err;
                        }
                        else{
                            let no_err=[];
                            no_err.push({message:"Branch has been updated"});
                            res.json({no_err});
                        }
                    }
                );
            }
        }
    );
}

const updatePizzaPrice = async(req,res)=>{
    let {pizzaid,price}=req.params;
    console.log(pizzaid,price);  
    pool.query(
        `select * from pizzas where pizzaid=$1`,[pizzaid],
        (err,results)=>{
            if(err){
                throw err;
            }
            else if(results.rows.length==0){
                let error=[];
                error.push({message:"Pizza does not exist"});
                res.json({error});
            }
            else if(results.rows.length>0){
                pool.query(
                    `update pizzas set price=$1 where pizzaid=$2`,[price,pizzaid],
                    (err,results)=>{
                        if(err){
                            throw err;
                        }
                        else{
                            let no_err=[];
                            no_err.push({message:"Pizza price has been updated"});
                            res.json({no_err});
                        }
                    }
                );
            }
        }
    );
}

const updatePizzaDetails = async(req,res)=>{
    let {pizzaid,details}=req.params;
    console.log(pizzaid,details);  
    pool.query(
        `select * from pizzas where pizzaid=$1`,[pizzaid],
        (err,results)=>{
            if(err){
                throw err;
            }
            else if(results.rows.length==0){
                let error=[];
                error.push({message:"Pizza does not exist"});
                res.json({error});
            }
            else if(results.rows.length>0){
                pool.query(
                    `update pizzas set details=$1 where pizzaid=$2`,[details,pizzaid],
                    (err,results)=>{
                        if(err){
                            throw err;
                        }
                        else{
                            let no_err=[];
                            no_err.push({message:"Pizza details has been updated"});
                            res.json({no_err});
                        }
                    }
                );
            }
        }
    );
}

const updatePizzaName = async(req,res)=>{
    let {pizzaid,pizzaname}=req.params;
    console.log(pizzaid,pizzaname);  
    pool.query(
        `select * from pizzas where pizzaid=$1`,[pizzaid],
        (err,results)=>{
            if(err){
                throw err;
            }
            else if(results.rows.length==0){
                let error=[];
                error.push({message:"Pizza does not exist"});
                res.json({error});
            }
            else if(results.rows.length>0){
                pool.query(
                    `update pizzas set pizzaname=$1 where pizzaid=$2`,[pizzaname,pizzaid],
                    (err,results)=>{
                        if(err){
                            throw err;
                        }
                        else{
                            let no_err=[];
                            no_err.push({message:"Pizza name has been updated"});
                            res.json({no_err});
                        }
                    }
                );
            }
        }
    );
}

const updatetoppingName = async(req,res)=>{
    let {toppingid,toppingname}=req.params;
    console.log(toppingid,toppingname);  
    pool.query(
        `select * from toppings where toppingid=$1`,[toppingid],
        (err,results)=>{
            if(err){
                throw err;
            }
            else if(results.rows.length==0){
                let error=[];
                error.push({message:"Topping does not exist"});
                res.json({error});
            }
            else if(results.rows.length>0){
                pool.query(
                    `update toppings set toppingname=$1 where toppingid=$2`,[toppingname,toppingid],
                    (err,results)=>{
                        if(err){
                            throw err;
                        }
                        else{
                            let no_err=[];
                            no_err.push({message:"Topping name has been updated"});
                            res.json({no_err});
                        }
                    }
                );
            }
        }
    );
}

const updateToppingDetails = async(req,res)=>{
    let {toppingid,details}=req.params;
    console.log(toppingid,details);  
    pool.query(
        `select * from toppings where toppingid=$1`,[toppingid],
        (err,results)=>{
            if(err){
                throw err;
            }
            else if(results.rows.length==0){
                let error=[];
                error.push({message:"Topping does not exist"});
                res.json({error});
            }
            else if(results.rows.length>0){
                pool.query(
                    `update toppings set details=$1 where toppingid=$2`,[details,toppingid],
                    (err,results)=>{
                        if(err){
                            throw err;
                        }
                        else{
                            let no_err=[];
                            no_err.push({message:"Topping details has been updated"});
                            res.json({no_err});
                        }
                    }
                );
            }
        }
    );
}

const updateToppingPrice = async(req,res)=>{
    let {toppingid,price}=req.params;
    console.log(toppingid,price);  
    pool.query(
        `select * from toppings where toppingid=$1`,[toppingid],
        (err,results)=>{
            if(err){
                throw err;
            }
            else if(results.rows.length==0){
                let error=[];
                error.push({message:"Topping does not exist"});
                res.json({error});
            }
            else if(results.rows.length>0){
                pool.query(
                    `update toppings set price=$1 where toppingid=$2`,[price,toppingid],
                    (err,results)=>{
                        if(err){
                            throw err;
                        }
                        else{
                            let no_err=[];
                            no_err.push({message:"Topping price has been updated"});
                            res.json({no_err});
                        }
                    }
                );
            }
        }
    );
}

const deletePizza =  async(req,res)=>{
    let {pizzaid}=req.params;
    console.log(pizzaid);  
    pool.query(
        `select * from pizzas where pizzaid=$1`,[pizzaid],
        (err,results)=>{
            if(err){
                throw err;
            }
            else if(results.rows.length==0){
                let error=[];
                error.push({message:"Pizza does not exist"});
                res.json({error});
            }
            else if(results.rows.length>0){
                pool.query(
                    `delete from pizzas where pizzaid=$1`,[pizzaid],
                    (err,results)=>{
                        if(err){
                            throw err;
                        }
                        else{
                            let no_err=[];
                            no_err.push({message:"Pizza has been deleted"});
                            res.json({no_err});
                        }
                    }
                );
            }
        }
    );
}

const deleteTopping = async(req,res)=>{
    let {toppingid}=req.params;
    console.log(toppingid);  
    pool.query(
        `select * from toppings where toppingid=$1`,[toppingid],
        (err,results)=>{
            if(err){
                throw err;
            }
            else if(results.rows.length==0){
                let error=[];
                error.push({message:"Topping does not exist"});
                res.json({error});
            }
            else if(results.rows.length>0){
                pool.query(
                    `delete from toppings where toppingid=$1`,[toppingid],
                    (err,results)=>{
                        if(err){
                            throw err;
                        }
                        else{
                            let no_err=[];
                            no_err.push({message:"Topping has been deleted"});
                            res.json({no_err});
                        }
                    }
                );
            }
        }
    );
}

const deleteOrderType = async(req,res)=>{
    let {typeid}=req.params;
    console.log(typeid);  
    pool.query(
        `select * from ordertype where typeid=$1`,[typeid],
        (err,results)=>{
            if(err){
                throw err;
            }
            else if(results.rows.length==0){
                let error=[];
                error.push({message:"Order type does not exist"});
                res.json({error});
            }
            else if(results.rows.length>0){
                pool.query(
                    `delete from ordertype where typeid=$1`,[typeid],
                    (err,results)=>{
                        if(err){
                            throw err;
                        }
                        else{
                            let no_err=[];
                            no_err.push({message:"Order type has been deleted"});
                            res.json({no_err});
                        }
                    }
                );
            }
        }
    );
}

const deleteOrderByid = async(req,res)=>{
    let {orderid}=req.params;
    console.log(orderid);  
    pool.query(
        `select * from orders where orderid=$1`,[orderid],
        (err,results)=>{
            if(err){
                throw err;
            }
            else if(results.rows.length==0){
                let error=[];
                error.push({message:"Order does not exist"});
                res.json({error});
            }
            else if(results.rows.length>0){
                pool.query(
                    `delete from orderpizzaTopping where orderid=$1`,[orderid],
                    (err,results)=>{
                        if(err){
                            throw err;
                        }
                        else{
                            pool.query(
                                `delete from orders where orderid=$1`,[orderid],
                                (err,results)=>{
                                    if(err){
                                        throw err;
                                    }
                                    else{
                                        let no_err=[];
                                        no_err.push({message:"Order has been deleted"});
                                        res.json({no_err});
                                    }
                                }
                            );
                        }
                    }
                );
            }
        }
    );
}

module.exports = {
    getadminLogin,
    getadminSignup,
    getadminDashboard,
    getaddOrderType,
    getaddPizza,
    getaddTopping,
    getaddBranch,
    getReviews,
    getshowOrders,
    markDelivered,
    markReady,
    deleteOrder,
    addBranch,
    addOrderType,
    addDeliveryMan,
    addPizza,
    addTopping,
    adminSignup,
    adminRegister,
    adminLogin,
    deleteBranch,
    putbranch,
    updatebranch,
    updatePizzaPrice,
    updatePizzaDetails,
    updatePizzaName,
    updatetoppingName,
    updateToppingDetails,
    updateToppingPrice,
    deletePizza,
    deleteTopping,
    deleteOrderType,
    deleteOrderByid
};