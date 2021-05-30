const fs = require('fs');

let rawdata = fs.readFileSync('F:/Users/wesee/Desktop/开包game.js后的文件');
let source = JSON.parse(rawdata);
console.log(source[0].source)
console.log(source[0].id)
source.forEach(s_file => {
    fs.writeFile(s_file.id+'.js',s_file.source,()=>{if( s_file.entry==true)console.log(s_file.id+'是启动项！！！！！！！！！！！！')})
    
}); 