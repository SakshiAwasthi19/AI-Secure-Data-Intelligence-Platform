declare module 'pdf-parse/lib/pdf-parse.js' {
  interface PDFData {
    numpages: number;
    numrender: number;
    info: any;
    metadata: any;
    text: string;
    version: string;
  }

  function render_page(pageData: any): Promise<string>;

  interface Options {
    pagerender?: typeof render_page;
    max?: number;
    version?: string;
  }

  function PDFParse(dataBuffer: Buffer, options?: Options): Promise<PDFData>;

  export default PDFParse;
}
