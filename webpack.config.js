const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './public/js/app.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, './public/dist')
    },
    module: {
        rules: [
            {
                //js
                test: /\.m?js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/present-env']
                    }
                }
            }
        ]
    }
}


/*
entry -> es un archivo de entrada, el archivo que va a tomar webpack, babel loader, etc.
output -> archivo de salida
module -> webpack requiere de algunos module que alguno los tengo otros yo lo importo y aca
 le indicamos que modulo queremos utilizar.
 test -> la expresion regular hace que vaya al entry point y busque los
         archivos js.
loader -> indicamos que plugin queremos usar.
*/