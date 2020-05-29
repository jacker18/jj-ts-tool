#!/usr/bin/env node

import Filetool from "./lib/file";
import Exec from "./lib/exec";
require("typescript-require");

(async () => {
  let arv: any = process.argv;
  if (arv[2]) {
    let isInputDir: any = false;
    isInputDir = await Filetool.isDir(arv[2]);
    let dir: any = arv[2].split("/");
    let inputFileArr: any = [];
    inputFileArr=await Filetool.mapDir(arv[2]);
    if (isInputDir) {
      inputFileArr.forEach((e) => {
        let suffix = e.substr(-3);
        if (suffix.indexOf(".ts") > -1) {
          if (arv[3]) {
            Exec.startExec(`tsc ${e} --outdir ${arv[3]}`);
          } else {
            Exec.startExec(`tsc ${e}`);
          }
        }
      });
    } else {
      if (arv[3]) {
        Exec.startExec(`tsc ${arv[2]} --outdir ${arv[3]}`);
      } else {
        // 再默认目录
        Exec.startExec(`tsc ${arv[2]}`);
      }
    }
  }
})();
