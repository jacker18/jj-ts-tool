declare class FileTool {
    static readFile(path: any): Promise<unknown>;
    static isFileExisted(path: string): Promise<unknown>;
    static isDir(path: string): Promise<unknown>;
    static mapDir(path: string): Promise<unknown>;
    static creatFile(path: string, content: string): Promise<unknown>;
    static delFiles(path: string): void;
    static mkdir(filepath: any): void;
    constructor();
}
export default FileTool;
//# sourceMappingURL=file.d.ts.map