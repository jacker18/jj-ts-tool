import * as fs from "fs";
import {join} from 'path';
class FileTool {
    public static readFile(path) {
        return new Promise(resolve => {
            fs.readFile(path, "utf-8", (err, data) => {
                if (err) {
                    resolve({
                        err
                    });
                }
                resolve({
                    data
                });
            });
        });
    }
    public static isFileExisted(path: string) {
        return new Promise((resolve) => {
            fs.access(path, (err) => {
                if (err) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            })
        })
    }
    public static isDir(path:string){
        return new Promise((resolve)=>{
            let stat=fs.statSync(path);
            let dir=stat.isDirectory();
                resolve(dir)
        })
    }
    public static mapDir(path:string){
         return new Promise(async (resolve)=>{
             let pathArr=[];
             let isDirectory=await this.isDir(path);
             if(isDirectory){
                let paths:any=fs.readdirSync(path);
                paths.forEach(async (pathstr,index)=>{
                    pathstr=join(path,pathstr);
                    if(this.isDir(pathstr)){
                       let arr:any=await this.mapDir(pathstr);
                       pathArr=[...pathArr,...arr];
                    }else{
                        pathArr.push(pathstr)
                    }
                    if(index===paths.length-1){
                     resolve(pathArr)
                    }
                });
             }else{
                 pathArr=[path];
                 resolve(pathArr);
             }
             
         })
    }
    public static creatFile(path: string, content: string) {
        return new Promise((resolve) => {
            fs.writeFile(path, content, 'utf-8', (error) => {
                if (error) {
                    console.log(error)
                    return;
                }
                resolve()
            })
        })
    }
    public static delFiles(path: string) {
        let files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach((file) => {
                let curPath = path + "/" + file;
                if (fs.statSync(curPath).isDirectory()) {
                    FileTool.delFiles(curPath); //递归删除文件夹
                } else {
                    fs.unlinkSync(curPath); //删除文件
                }
            });
            fs.rmdirSync(path);
        }
    }
    public static mkdir(filepath) {
        fs.mkdirSync(filepath)
    }

    constructor() { }
}
export default FileTool;