var config = {
   entry: './main.js',
	
   output: {
      filename: 'bundeledPage.js',
   },
	
   devServer: {
      inline: true,
      port: 9191
   },
	
   module: {
      loaders: [
         {
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
				
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
}

module.exports = config;