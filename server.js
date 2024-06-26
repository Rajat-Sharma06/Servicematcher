const express = require("express");
const app = express();

app.use(express.static("public"));
const fileuploader = require("express-fileupload");
const mysql2 = require("mysql2");
app.use(fileuploader());
app.listen(150, function() {


    console.log("yeesssssss");
})

app.get("/", function(req, resp) {
    let path = process.cwd() + "/public/index.html";
    resp.sendFile(path);
})

app.get("/profile", function(req, resp) {
    let path = process.cwd() + "/public/profile.html";
    resp.sendFile(path);
})

app.get("/dash", function(req, resp) {
    let path = process.cwd() + "/public/customer-dash.html";
    resp.sendFile(path);
})


app.get("/service-provider-dash", function(req, resp) {
    let path = process.cwd() + "/public/service-provider-dash.html";
    resp.sendFile(path);
})


app.get("/provider-profile", function(req, resp) {
    let path = process.cwd() + "/public/provider-profile.html";
    resp.sendFile(path);
})

app.get("/jobs", function(req, resp) {
    let path = process.cwd() + "/public/jobs.html";
    resp.sendFile(path);
})
app.get("/job", function(req, resp) {
    let path = process.cwd() + "/public/job.html";
    resp.sendFile(path);
})

app.get("/service", function(req, resp) {
    let path = process.cwd() + "/public/service.html";
    resp.sendFile(path);
})

app.get("/users", function(req, resp) {
    let path = process.cwd() + "/public/users.html";
    resp.sendFile(path);
})

app.get("/avail-service", function(req, resp) {
    let path = process.cwd() + "/public/avail-service.html";
    resp.sendFile(path);
})
app.get("/service-manager", function(req, resp) {
    let path = process.cwd() + "/public/service-manager.html";
    resp.sendFile(path);
})

app.get("/admin", function(req, resp) {
    let path = process.cwd() + "/public/admin.html";
    resp.sendFile(path);
})

app.use(express.urlencoded({ extended: true }));

/*app.post("/signup-save",function(req,resp)
{
    console.log(req.body.textemail);
    //resp.send(req.query.textemail);
    resp.send(req.body);
    
});*/
// const serverObj = {
//     host: "127.0.0.1",
//     user: "root",
//     password: "rajat@1406",
//     database: "project",
//     dateStrings: true

// }

const serverObj = {
    host: "btyr6y05je2n8p0ffyag-mysql.services.clever-cloud.com.1",
    user: "u0wwwjsoocgavq9a",
    password: "usA1XChUgwIGoZbNT0Zy",
    database: "btyr6y05je2n8p0ffyag",
    dateStrings: true

}
const mysql = mysql2.createConnection(serverObj);

mysql.connect(function(err) {
    if (err == null)
        console.log("Connected to database");
    else
        console.log(err.message);
})

/*app.post("/signup-save",function(req,resp)
{
    const email=req.body.textemail;
    const password=req.body.txtpass;
    const select=req.body.txtsel;
    mysql.query("insert into userss values(?,?,?,1,current_date())",[email,password,select],function(err)
   { if(err==null)
    resp.send("Record Saved Sucessfullyyy");
    else
    resp.send(err.message);
   })
    
})*/





//create table userss(emailid varchar(30) PRIMARY key,password varchar(15),usertype varchar(10),status varchar(2),dos date);
app.get("/signup-save", function(req, resp) {
    mysql.query("select * from userss where emailid=?", [req.query.kuchbhiemail], function(err, resultJsonAry) {
        if (resultJsonAry.length == 1)
            resp.send("Email address is already registered");
        // else if (req.query.kuchbhiemail == "")
        //     resp.send("Fill email please..")
        // else if (req.query.kuchbhipass == "")
        //     resp.send("Fill passoword please...");
        else
            mysql.query("insert into userss values(?,?,?,1,current_date())", [req.query.kuchbhiemail, req.query.kuchbhipass, req.query.kuchbhisel], function(err) {
                if (err == null)

                    resp.send("Signup successfully...")

                else
                    resp.send(err.message);
            })

    })
})



// app.get("/login", function(req, resp) {
//     mysql.query("select * from userss where emailid=? and password=?", [req.query.kuchemail, req.query.kuchpass], function(err, jsonAry) {
//         //JSON.stringify(jsonAry);
//         if (jsonAry[0].status == 1) {
//             const ut = jsonAry[0].usertype;
//             resp.send(ut);
//         } else if (jsonAry[0].status == 0) {
//             resp.send("Your Account is blocked!");
//         } else resp.send(err.message);

//     })

//})

app.get("/login", function(req, resp) {
    const txtemail = req.query.kuchemail;
    const txtpass = req.query.kuchpass;
    mysql.query("select * from userss where emailid=? and password=?", [txtemail, txtpass], function(err, jsonAry) {
        if (err) {
            resp.send(err.message);
            return;
        }

        if (jsonAry.length == 1) {

            if (jsonAry[0].status == 1) {
                const userType = jsonAry[0].usertype;
                resp.send(userType);
            } else
                resp.send("your account is bloacked!! contact admin");
        } else
            resp.send("invalid email or password..");

    })
})


//create table usersProfile(fname varchar(30), lname varchar(30), emailid varchar(30), state varchar(15), city varchar(15), number varchar(13), address varchar(30),pic varchar(30));

app.post("/profile-save", function(req, resp) {
        const fname = req.body.fn;
        const lname = req.body.ln;
        const email = req.body.em;


        const state = req.body.st;
        const city = req.body.ct;
        const number = req.body.nm;
        const address = req.body.add;

        let filename = "nopic.jpg";


        if (req.files != null) {
            filename = req.files.ppic.name;
            let path = process.cwd() + "/public/uploads/" + filename;
            req.files.ppic.mv(path);
        }

        mysql.query("insert into usersProfile values(?,?,?,?,?,?,?,?)", [fname, lname, email, state, city, number, address, filename], function(err) {
            if (err == null)
                resp.send("successfully saved.....")
            else resp.send(err.message);
        })
    })
    // app.post("/profile-save", function(req, resp) {

//     const firstn = req.body.fn;
//     const lastn = req.body.ln;
//     const email = req.body.em;
//     const state = req.body.st;
//     const city = req.body.ct;
//     const number = req.body.nm;
//     const address = req.body.addr;
//     let filename;



//     //if (req.files == null) //when no pic selecetd
//     //filename = "nopic.jpg";
//     //when pic is selected by user
//     {
//         filename = req.files.ppic.name;
//         let path = process.cwd() + "/public/uploads/" + filename;
//         req.files.ppic.mv(path); //to store pic in uploads folder

//     }
//     req.body.ppic = filename;
//     mysql.query("insert into usersProfile values(?,?,?,?,?,?,?,?)", [firstn, lastn, email, state, city, number, address, filename], function(err) {
//         if (err == null)
//             resp.send("Customer Details saved Sucessfully...");
//         else
//             resp.send(err.message);
//     })



// });

app.post("/update", function(req, resp) {
    const fname = req.body.fn;
    const lname = req.body.ln;
    const email = req.body.em;


    const state = req.body.st;
    const city = req.body.ct;
    const number = req.body.nm;
    const address = req.body.add;

    let filename = req.body.hid;


    if (req.files != null) {
        filename = req.files.ppic.name;
        let path = process.cwd() + "/public/uploads/" + filename;
        req.files.ppic.mv(path);
    }

    mysql.query("update usersProfile set fname=?,lname=?,state=?,city=?,number=?,address=?,pic=? where emailid=?", [fname, lname, state, city, number, address, filename, email], function(err) {
        if (err == null)
            resp.send("successfully saved.....")
        else resp.send(err.message);
    })
})

app.get("/search", function(req, resp) {
    mysql.query("select * from usersProfile where emailid=?", [req.query.kuchemail], function(err, resultJsonAry) {
        if (err == null) {
            resp.send(resultJsonAry)
        } else
            resp.send(err);

    })
})

app.get("/ssearch", function(req, resp) {
    mysql.query("select * from usersProfile where emailid=?", [req.query.kuchbhiemail], function(err, resultJsonAry) {
        if (err == null) {
            resp.send(resultJsonAry)
        } else
            resp.send("ra" + err.message);

    })
})

app.get("/save-pr", function(req, resp) {
    mysql.query("insert into task values(0,?,?,?,?,?,?)", [req.query.email, req.query.category, req.query.address, req.query.city, req.query.upto, req.query.task], function(err) {
        if (err == null)
            resp.send("Customer Details saved Sucessfully...");
        else
            resp.send(err.message);
    })
})


app.get("/changepass", function(req, resp) {

    mysql.query("select * from userss where emailid=? and password=?", [req.query.email, req.query.oldpass], function(err, result) {
        if (result.length == 1)
            mysql.query("update userss set password=? where emailid=?", [req.query.newpass, req.query.email], function(err, result) {
                if (err == null) resp.send("password changed successfully...");
                else
                    resp.send(err.message)

            })
        else
            resp.send("Invalid data");
        // if (err == null) {
        //     console.log(req.query.newpass);
        //     console.log(req.query.oldpass);
        //     resp.send("Password changed......");
        // } else resp.send(err.message);
    })
})


//create table provider(pemailid varchar(30) primary key,pname varchar(30),pnumber varchar(12),pgender varchar(10),pcategory varchar(30),pfirm varchar(30),pwebsite varchar(30),plocation varchar(50),psince varchar(20),pid varchar(30),pabout varchar(100));app.post("/update", function(req, resp) {
app.post("/provider", function(req, resp) {
    const email = req.body.em;
    const name = req.body.nm;
    const nmb = req.body.number;

    const gender = req.body.gd;
    const category = req.body.ct;
    const firm = req.body.fm;
    const website = req.body.wb;
    const loc = req.body.lt;
    const since = req.body.sc;
    const text = req.body.et;
    let filename = "nopic.jpg";


    if (req.files != null) {
        filename = req.files.ppic.name;
        let path = process.cwd() + "/public/uploads/" + filename;
        req.files.ppic.mv(path);
    }

    mysql.query("insert into provider values(?,?,?,?,?,?,?,?,?,?,?)", [email, name, nmb, gender, category, firm, website, loc, since, filename, text], function(err) {
        if (err == null)
            resp.send("successfully saved.....")
        else resp.send(err.message);
    })
})
app.get("/psearch", function(req, resp) {
    mysql.query("select * from provider where pemailid=?", [req.query.kuchemail], function(err, resultJsonAry) {
        if (err == null) {

            resp.send(resultJsonAry)
        } else
            resp.send(err);

    })
})

app.post("/pupdate", function(req, resp) {
    const email = req.body.em;
    const name = req.body.nm;
    const num = req.body.number;
    const gen = req.body.gd;
    const cat = req.body.ct;
    const firm = req.body.fm;
    const web = req.body.wb;
    const location = req.body.lt;
    const since = req.body.sc;
    const pic = req.body.pid;
    const address = req.body.et;

    let filename = req.body.hid;


    if (req.files != null) {
        filename = req.files.ppic.name;
        let path = process.cwd() + "/public/uploads/" + filename;
        req.files.ppic.mv(path);
    }
    //to store pic in uploads folder

    //create table provider(pemailid varchar(30) primary key,pname varchar(30),pnumber varchar(12),pgender varchar(10),pcategory varchar(30),pfirm varchar(30),pwebsite varchar(30),plocation varchar(50),psince varchar(20),pid varchar(30),pabout varchar(100));
    mysql.query("update provider set pname=?,pnumber=?,pgender=?,pcategory=?,pfirm=?,pwebsite=?,plocation=?,psince=?,pabout=? where pemailid=?", [name, num, gen, cat, firm, web, location, since, address, email], function(err) {
        if (err == null)
            resp.send("Customer Details saved Sucessfully...");
        else
            resp.send(err.message);
    })



});




app.get("/angular-fetch-all", function(req, resp) {
    mysql.query("select * from userss", function(err, resultJsonAry) {
        resp.send(resultJsonAry);
    })
})

app.get("/angular-fetch-service", function(req, resp) {
    mysql.query("select * from provider", function(err, resultJsonAry) {
        resp.send(resultJsonAry);
    })
})
app.get("/angular-fetch-users", function(req, resp) {
    mysql.query("select * from usersProfile", function(err, resultJsonAry) {
        resp.send(resultJsonAry);
    })
})

app.get("/angular-delete", function(req, resp) {
    const email = req.query.emailkuch;
    mysql.query("delete from userss where pemailid=?", [email], function(err, result) {
        if (err == null) {
            if (result.affectedRows == 1)
                resp.send("Record Deleted Successfullyyy");
            else
                resp.send("Inavlid ID");
        } else
            resp.send(err.message);
    })

})

app.get("/angular-delete-service", function(req, resp) {
    const email = req.query.emailkuch;
    mysql.query("delete from provider where pemailid=?", [email], function(err, result) {
        if (err == null) {
            if (result.affectedRows == 1)
                resp.send("Record Deleted Successfullyyy");
            else
                resp.send("Inavlid ID");
        } else
            resp.send(err.message);
    })

})
app.get("/resume", function(req, resp) {
    const email = req.query.emailkuch;
    const sta = req.query.status;
    if (sta == 1) {
        mysql.query("update  userss set status=0 where emailid=? ", [email], function(err, result) {
            if (err == null) {
                if (result.affectedRows == 1)
                    resp.send("Status Updated");
                else
                    resp.send("Inavlid ID");
            } else
                resp.send(err.message);
        })
    } else {

        mysql.query("update  userss set status=1 where emailid=? ", [email], function(err, result) {
            if (err == null) {
                if (result.affectedRows == 1)
                    resp.send("Status Updated");
                else
                    resp.send("Inavlid ID");
            } else
                resp.send(err.message);
        })

    }

})


app.get("/angular-fetch-jobs", function(req, resp) {
    mysql.query("select * from task", function(err, resultJsonAry) {
        resp.send(resultJsonAry);
    })
})

app.get("/sssearch", function(req, resp) {
    mysql.query("select * from task where emailid=?", [req.query.kuchemail], function(err, resultJsonAry) {
        resp.send(resultJsonAry);
    })
})
app.get("/fetch-location", function(req, resp) {
    mysql.query("select distinct plocation from provider ", function(err, resultJsonAry) {
        resp.send(resultJsonAry);
    })
})

app.get("/fetch-category", function(req, resp) {
    mysql.query("select distinct pcategory from provider", function(err, resultJsonAry) {
        resp.send(resultJsonAry);
    })
})
app.get("/task-delete", function(req, resp) {
    const email = req.query.emailkuch;
    mysql.query("delete from task where emailid=?", [email], function(err, result) {
        if (err == null) {
            if (result.affectedRows == 1)
                resp.send("Record Deleted Successfullyyy");
            else
                resp.send("Inavlid ID");
        } else
            resp.send(err.message);
    })

})

app.get("/fetch-data", function(req, resp) {

    mysql.query("select * from provider where plocation=? and pcategory=?", [req.query.lockuch, req.query.catkuch], function(err, resultJsonArys) {
        resp.send(resultJsonArys);
    })
})