import { exec } from "child_process";
class Exec{
    public static startExec(cmd:any){
        exec(cmd);
    }
}
export default Exec