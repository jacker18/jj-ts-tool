#!/usr/bin/env node

import { exec } from "child_process";
require('typescript-require');
(async () => {
    let arv: any = process.argv;
    console.log(arv);
    if (arv[2]) {
        let dir:any=arv[2].split('/');
        let dirArr:any=dir.slice(0,dir.length-1).join('/');
        if (arv[3]) {
            exec(`tsc ${arv[2]} --outdir ${arv[3]}`)
        } else {
            exec(`tsc ${arv[2]} --outdir ${dirArr} `)
        }
    }
})()