import XLSX from 'xlsx'
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
      xlsxJson: {}
    }
  },
  methods: {
    readFileToJson(files) {
      // let jsonData = []
      // if (this.multiple) {
      //   let len = files.length
      //   this.loading = true
      //   for (let i = 0; i < len; i++) {
      //     jsonData.push(this.fileReaderHandle(files[i]))
      //   }
      // } else {
      //   jsonData.push(this.fileReaderHandle(files[0]))
      // }
      let result = {
        headers: [],
        xlsxdata: []
      }
      let len = files.length
      let loadnum = 0
      this.loading = true
      for (let i = 0; i < len; i++) {
        const reader = new FileReader()
        reader.onload = e => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'array' })
          console.log(workbook)
          if (this.readMulSheet) { // 读取多表'sheet1'，'sheet2'等
            result.xlsxdata = workbook.SheetNames.map(item => {
              const worksheet = workbook.Sheets[item]
              this.isGetHeaderRow && result.headers.push(this.getHeaderRow(worksheet));
              return XLSX.utils.sheet_to_json(worksheet);
            })
          } else {
            const firstSheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[firstSheetName]
            result.headers.push(this.getHeaderRow(worksheet));
            result.xlsxdata.push(XLSX.utils.sheet_to_json(worksheet))
          }
          loadnum++
          if (loadnum === len) {
            typeof this.filesOnLoad === 'function' && this.filesOnLoad(result)
            this.xlsxJson = result
            this.loading = false
          }
        }
        reader.readAsArrayBuffer(files[i])
      }
      // return xlsxdata;
    },
    fileReaderHandle(File) {
      let result = {
        headers: [],
        xlsxdata: []
      }
      const reader = new FileReader()
      reader.onload = e => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'array' })
        // console.log(workbook)
        if (this.readMulSheet) { // 读取多表'sheet1'，'sheet2'等
          result.xlsxdata = workbook.SheetNames.map(item => {
            const worksheet = workbook.Sheets[item]
            this.isGetHeaderRow && result.headers.push(this.getHeaderRow(worksheet));
            return XLSX.utils.sheet_to_json(worksheet);
          })
        } else {
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          result.headers.push(this.getHeaderRow(worksheet));
          result.xlsxdata.push(XLSX.utils.sheet_to_json(worksheet))
        }
      }
      reader.readAsArrayBuffer(File)
      // console.log(result)
      return result
    },
    getHeaderRow (sheet) { // 获取sheet头
      const headers = []
      if (!sheet['!ref']) {
        return headers
      }
      const range = XLSX.utils.decode_range(sheet['!ref'])
      console.log(range)
      let C
      const R = range.s.r
      console.log(R)
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
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
