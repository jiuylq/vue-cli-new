import XLSX from 'xlsx'
const ExcelJS = require('exceljs');
export default {
  data() {
    return {
      fileName: '', // 文件名
      loading: false, // 加载中
      isWrite: false, // 是否开启下载
      writeName: 'xxx.xlsx', // 导出的文件名
      writeSheetName: ['Sheet1', 'Sheet2', 'Sheet3'], // 导出的表名，
      multiple: false, // 是否是条数据
      isGetHeaderRow: false, // 是否获取表头
      readMulSheet: false, // 是否读取多表，'Sheet1', 'Sheet2', 'Sheet3'，默认只读取'Sheet1'
      bookType: 'xlsx', // 要生成的文件类型
      buffertype: 'application/octet-stream', // 生成文件流的格式MIME
      useBuffer: false, // 使用Bolb生成的文件流
      xlsxJson: {},
      inputfile: null,
      excelData: null
    }
  },
  mounted() {
    // console.log(ExcelJS)
  },
  methods: {
    async toExcelWb(data) {
      console.log('toExcelWb')
      const workbook = new ExcelJS.Workbook()
      // await workbook.xlsx.readFile(data)
      // await workbook.xlsx.read(data);
      await workbook.xlsx.load(data);
      const sheet = workbook.addWorksheet('My Sheet', { properties: { tabColor: { argb: 'FFC0000' } } })
      sheet.columns = [
        { header: 'Id', key: 'id', width: 10 },
        { header: 'Name', key: 'name', width: 32 },
        { header: 'D.O.B.', key: 'dob', width: 10, outlineLevel: 1 }
      ];
      sheet.addRow({ id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7) })
      sheet.getCell('A1').fill = {
        type: 'pattern',
        pattern: 'darkTrellis',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      };
      const buffer = await workbook.xlsx.writeBuffer();
      // let ab = Buffer.from(buffer, "binary");
      console.log(buffer)
      const blob = new Blob([buffer], {
        type: this.buffertype
      })
      this.downLoad(blob)
    },
    downLoad(blob) {
      const link = document.createElement("a");
      const body = document.querySelector("body");
      link.href = window.URL.createObjectURL(blob); // 创建对象url
      link.download = this.writeName;
      // fix Firefox
      link.style.display = "none";
      body.appendChild(link);
      link.click();
      body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    },
    readFileToJson(files) {
      let result = {
        headers: [],
        xlsxdata: [],
        merges: [],
        ref: []
      }
      // this.toExcelWb(files[0])
      let len = files.length
      let loadnum = 0
      this.loading = true
      for (let i = 0; i < len; i++) {
        const reader = new FileReader()
        reader.onload = e => {
          const data = e.target.result;
          console.log(data)
          i === 0 && this.toExcelWb(data)
          const workbook = XLSX.read(data, { type: 'array' })
          // console.log(workbook)
          this.inputfile = workbook
          // XLSX.writeFile(workbook, 'xxx.xlsx')
          // if (this.readMulSheet) { // 读取多表'sheet1'，'sheet2'等
          result.xlsxdata = workbook.SheetNames.map(item => {
            const worksheet = workbook.Sheets[item]
            // console.log(XLSX.utils.sheet_to_html(worksheet))
            this.isGetHeaderRow && result.headers.push(this.getHeaderRow(worksheet));
            result.ref.push(worksheet['!ref'])
            result.merges.push(worksheet['!merges'])
            return XLSX.utils.sheet_to_json(worksheet);
          })
          // } else {
          //   const firstSheetName = workbook.SheetNames[0]
          //   const worksheet = workbook.Sheets[firstSheetName]
          //   result.headers.push(this.getHeaderRow(worksheet));
          //   result.xlsxdata.push(XLSX.utils.sheet_to_json(worksheet))
          // }
          loadnum++
          // if (loadnum === len) {
          //   typeof this.filesOnLoad === 'function' && this.filesOnLoad(result)
          //   this.xlsxJson = result
          //   this.loading = false
          // }
        }
        reader.readAsArrayBuffer(files[i])
      }
    },
    getHeaderRow (sheet) { // 获取sheet头
      const headers = []
      if (!sheet['!ref']) {
        return headers
      }
      const range = XLSX.utils.decode_range(sheet['!ref'])
      // console.log(range)
      let C
      const R = range.s.r
      // console.log(R)
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        // console.log(cell)
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    // 读取拥有合并单元格的表格信息
    getMergeXlsxData(sheet) {
      // sheet['!ref']：表示所有单元格的范围，例如从A1到F8则记录为A1:F8；
      // sheet[!merges]：存放一些单元格合并信息，是一个数组，每个数组由包含s和e构成的对象组成，s表示开始，e表示结束，r表示行，c表示列；
      // 注意单元格第一位为{c: 0, r: 0}
      return sheet['!merges']
    },
    jsonToExcelOrBolb (json) {
      // 如果使用二进制流格式的话useBuffer=true，将默认返回数据流
      let len = json.length
      // return true;
      let wb = XLSX.utils.book_new()
      for (let i = 0; i < len; i++) {
        let ws = XLSX.utils.json_to_sheet(json[i])
        let wsname = this.writeSheetName[i] ? this.writeSheetName[i] : 'Sheet' + (i + 1)
        XLSX.utils.book_append_sheet(wb, ws, wsname)
      }
      // console.log()
      for (let i in this.inputfile) {
        if (i !== 'Sheets') {
          wb[i] = this.inputfile[i]
        }
      }
      // wb['Styles'] = this.inputfile['Styles']
      // XLSX.utils.book_append_sheet(wb, this.inputfile['Styles'], 'Styles')
      let wbopts = {
        bookType: this.bookType, // 要生成的文件类型
        bookSST: false,
        type: 'binary' // 二进制格式
      }
      var wbout = XLSX.write(wb, wbopts)
      console.log(wb)
      if (this.useBuffer) {
        return new Blob([this.strToBuffer(wbout)], {
          type: this.buffertype
        })
      } else {
        XLSX.writeFile(wb, this.writeName)
      }
      // 字符串转ArrayBuffer
      // var form = new FormData() // FormData 对象
      // form.append('file', blob) // 文件对象
      // console.log(form.get('file'))
      // XLSX.writeFile(wb, filename)
    },
    strToBuffer (s) {
      var buf = new ArrayBuffer(s.length)
      var view = new Uint8Array(buf)
      for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
      return buf
    }
  }
}
