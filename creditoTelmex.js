const newman = require('C:/Users/ksolis/AppData/Roaming/npm/node_modules/newman');
var code = [];
var results = [];

newman.run({
    collection: require('./Telmex.postman_collection.json'),
    environment: './claroshop.postman_environment.json',
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
    code.push(args.response.code);
    results.push(JSON.parse(args.response.stream.toString()));
    console.log(code);
    console.log(results);
})
.on('done', function (err, args) {
    
    for(i = 0; i < code.length;i ++ ){
        if (code[i] == 200 || 201){
            if (results[0].data.message == 'EXITO'){
                console.log("RESPUESTA EXITOSA");
            }else{
                console.log("---LA RESPUESTA DEL REQUEST NO ES LA ESPERADA; NO SE PUDO LOGEAR: " + results[0].data.message);
                process.abort();
            }
            if (results[1].data.phone == '5526461829'){
                console.log("RESPUESTA EXITOSA");
            }else{
                console.log("---LA RESPUESTA DEL REQUEST NO ES LA ESPERADA; El NUMERO NO COINCIDE: " + results[1].data.phone);
                process.abort();
            }
            if (results[2].data[0].phone == '5526461829'){
                console.log("RESPUESTA EXITOSA");
            }else{
                console.log("---LA RESPUESTA DEL REQUEST NO ES LA ESPERADA; El NUMERO NO COINCIDE: " + results[2].data[0].phone);
                process.abort();
            }
        }else{
            console.log("---LA RESPUESTA DEL REQUEST NO ES LA ESPERADA; CODIGO: " + code[i]);
            process.abort();
        }
    }
});