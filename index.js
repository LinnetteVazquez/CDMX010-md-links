const readPath = require("./readPath");
console.log(readPath("./", ".md"));
// module.exports = () => {
//   // ...
//   console.log("hola");
// };

//console.log(files)
//fs.writeFileSync('message.md', 'Hello Node.js')

// const readDoc = (archivo)=>{
//   fs.readdir(archivo,(error, files) => {
//    if(error){
//    throw error
//    }console.log(files)
//   for(let i in files) {
//    if(path.extname(files[i]) === ".md") {
//      console.log(files[i],);
//       // fs.readFile(files[i], 'utf-8', (error, data)=>{
//       //       if (error){
//       //           console.log(error.message)
//       //       }
//       //       console.log(data)

//         }
//    // } else if( path.extname(files[i]) === " "){
//    //    fs.readdir('./../',(error, files1) => {
//    //       if(error){
//    //          throw error
//    //       } console.log(files1)
//    //    })
//    }
//   })
// }

// readDoc('./');

// const getLinks = (data)=>{
//    let expresionReg = new RegExp('http')
// }
