const express = require("express");
const ReactSSR = require("react-dom/server");
const fs = require("fs");
const path = require("path");

const isDev = process.env.NODE_ENV === "development";


const app = new express();

if(!isDev){
    const serverEntry = require("../dist/server-entry.js").default;
    const template = fs.readFileSync(path.join(__dirname,"../dist/index.html"), "utf-8");
    const appString = ReactSSR.renderToString(serverEntry);
    app.use("/public", express.static(path.join(__dirname, "../dist")));
    app.get("*" ,function(req, res){
        res.send(template.replace("<!-- -->", appString));
    });
}else{
    const devStatic = require("./util/dev-static.js");
    devStatic(app);
}

app.listen("3333", function(){
    console.log("server is run in 3333");
});