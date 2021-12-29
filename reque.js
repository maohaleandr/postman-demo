const { exit } = require('process');
const newman = require('C:/Users/ksolis/AppData/Roaming/npm/node_modules/newman');
var code = "";
var code2 = "";
var results = [];
var results2 = [];


newman.run({
    collection: require('./pruebaCredito.postman_collection.json'),
    environment: './Sears.postman_environment.json',
    reporters: 'html',
    reporter: {
        html: {
            export: './newman/resultsCreditoSears.html',
        }
    }
}, function (err, res) {
	if (err) { throw err; }
    console.log('collection Api Credito sears run complete!');
})
.on('request', function (err, args) {
    code = args.response.code;
    results = JSON.parse(args.response.stream.toString());
})
.on('done', function (err, args) {
    if(code == '200'){
        if(results[0].name == "LUIS E"){
            console.log("RESPUESTA EXITOSA");
        }
        else{
            console.log("---LA RESPUESTA DEL REQUEST NO ES LA ESPERADA; EL NOMBRE NO COINCIDE: " + results[0].name);
            process.abort();
        }
    }else{
        console.log("---LA RESPUESTA DEL REQUEST NO ES LA ESPERADA; CODIGO: " + code);
        process.abort();
    }
});

newman.run({
    collection: require('./creditoTelmex.postman_collection.json'),
    environment: './claroshop.postman_environment.json',
    reporters: 'html',
    reporter: {
        html: {
            export: './newman/resultsCreditoTelmex.html',
        }
    }
},function(err, res){
    if (err) { throw err;}
    console.log('collection Api Credito Telcel run complete!');
})
.on('request', function (err, args) {
    code2 = args.response.code;
    results2 = JSON.parse(args.response.stream.toString());
})
.on('done', function (err, args) {
    if(code2 == '200'){
        if(results2.status == true){
            console.log("RESPUESTA EXITOSA");
        }
        else{
            console.log("---LA RESPUESTA DEL REQUEST NO ES LA ESPERADA; status: " + results2.status);
            process.abort();
        }
    }else{
        console.log("---LA RESPUESTA DEL REQUEST NO ES LA ESPERADA; CODIGO: " + code);
        process.abort();
    }
});
