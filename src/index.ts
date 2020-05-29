#!/usr/bin/env node

import Filetool from "./lib/file";
import Exec from "./lib/exec";
require("typescript-require");

(async () => {
  let arv: any = process.argv;
  if (arv[2]) {
    let isInputDir: any = false;
    isInputDir = await Filetool.isDir(arv[2]);
    let inputFileArr: any = [];
    inputFileArr = await Filetool.mapDir(arv[2]);
    if (isInputDir) {
      let tsArr: any = inputFileArr.map((e) => {
        let suffix = e.substr(-3);
        if (suffix.indexOf(".ts") > -1) {
          return e;
        } else {
          return "";
        }
      });
      let tsStr = tsArr.join(" ");
      if (arv[3]) {
        Exec.startExec(`tsc ${tsStr} -outDir ${arv[3]}`);
      } else {
        Exec.startExec(`tsc ${tsStr}`);
      }
    } else {
      if (arv[3]) {
        Exec.startExec(`tsc ${arv[2]} -outDir ${arv[3]}`);
      } else {
        // 再默认目录
        Exec.startExec(`tsc ${arv[2]}`);
      }
    }
  }
})();
