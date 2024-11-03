
import * as fs from 'node:fs/promises'

class FileHandler{
  constructor(filePath){
    this.filePath = filePath
  }
  async deleteFilePromise(){
    try{
      await fs.unlink(this.filePath)
      console.log('File Deleted successfully!')
    }catch(err){
      console.log(err.message)
    }finally{
      console.log('process completed!')
    }
  }

  /**
   * 
   * fs.constants.F_OK is a flag used with Node.js's fs.access() method to check if a file or directory exists. Specifically:

    fs.constants.F_OK is used to test for the file's existence without checking read or write permissions.
    It doesn't modify the file or directory; it just checks if it exists at the specified path.
   */

  async checkFileExistOrNot(callback){
      try{
        await fs.access(this.filePath,fs.constants.F_OK)
        console.log(`${this.filePath} found`)
        return {
          statusCode:200
        }
      }catch(err){
        return {
          statusCode:404
        }
      }
      
      
  }

}




try{
  const fileHandler1 = new FileHandler('./tmp/file1')
  const code = await fileHandler1.checkFileExistOrNot()
  if(code.statusCode === 200){
    fileHandler1.deleteFilePromise()
  }else{
    console.log('File Not Found')
  }
}catch(err){
  console.log(err.message)
}finally{
  console.log('Process Completed!')
}