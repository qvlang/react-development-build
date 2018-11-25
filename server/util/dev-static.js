const axios = require("axios") ;
const webpack = require("webpack");
const MemoryFs = require("memory-fs");
const path = require("path");
const ReactDomServer = require("react-dom/server");
const serverConfig = require("../../build/webpack.config.server.js");

const getTemplate = ()=>{
    return new Promise((resolve,reject)=> {
        axios.get("http://localhost:8888/index.html")
        .then(res=>{
            resolve(res.data)
        })
        .catch(err=>{
            reject(err)
        })
    })
}

const Module = module.constructor;

const mfs = new MemoryFs();
const serverCompiler = webpack(serverConfig);
serverCompiler.outputFileSystem = mfs;
let serverBundle;
serverCompiler.watch({}, (err,stats)=>{
    if(err) throw err;
    stats = stats.toJson();
    stats.errors.forEach(err => {
        console.error(err);
    });
    stats.warnings.forEach(warns=>{
        console.warn(warns);
    });
    const bundlePath = path.join(serverConfig.output.path,serverConfig.output.filename);
    const bundle = mfs.readFileSync(bundlePath,"utf-8");
    const m = new Module();
    m._compile(bundle,"server-entry.js");
    serverBundle = m.exports.default;
})

module.exports = (app) => {
    app.get("*", (req, res)=>{
        getTemplate().then(template=>{
            const content = ReactDOMServer.renderToString(serverBundle);
            res.send(template.replace("<!-- -->", content));
        })
    })
}