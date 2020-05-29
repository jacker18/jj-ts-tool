jj-ts-tool

- ts文件编译js文件小工具
## 安装
```
npm i -g jj-ts-tool
```
## 使用

在需要编译的ts文件项目中执行:
jj-ts-tool  编译文件地址  输出文件地址(可忽略)
若输出文件地址不存在 则默认输出在ts同级目录下
例如: jj-ts-tool ./demo/index.ts   或  jj-ts-tool ./demo/index.js ./dist/

支持目标目录批量处理
例如：jj-ts-tool ./src  不输入输出目录则在目标目录同级生成
     jj-ts-tool ./src  ./dist 输入目标目录会在目标生成ts 输出的文件结构为同级
