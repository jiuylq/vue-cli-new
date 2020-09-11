<template>
  <div class="hello">
    <input type="file" accept=".xlsx, .xls, .json" :multiple="multiple ? 'multiple' : ''" @change="fileHandleClick">
    <button @click="toXlsxArrayBuffer">json转xlsx文件流</button>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import rwxlsx from "@/mixins/rw_xlsx"
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      inputfile: null,
      fileName: '', // 文件名
      loading: false, // 加载中
      isWrite: false, // 是否开启下载
      writeName: 'xxx.xlsx', // 导出的文件名
      writeSheetName: ['Sheet1', 'Sheet2', 'Sheet3'], // 导出的表名，
      multiple: true, // 是否是条数据
      isGetHeaderRow: true, // 是否获取表头
      readMulSheet: true, // 是否读取多表，'Sheet1', 'Sheet2', 'Sheet3'，默认只读取'Sheet1'
      bookType: 'xlsx', // 要生成的文件类型
      buffertype: 'application/octet-stream', // 生成文件流的格式MIME
      useBuffer: true, // 使用Bolb生成的文件流
      json: [{ id: 1, name: '小明', value: 3, age: 18 }, { id: 2, name: '小红', value: 3, age: 17 }, { id: 3, name: '明明', value: 4, age: 16 }, { id: 4, name: '小小', value: 5, age: 15 }]
    }
  },
  mixins: [rwxlsx],
  created () {
  },
  methods: {
    fileHandleClick(e) {
      console.log(1)
      this.readFileToJson(e.target.files)
      // setTimeout(() => {
      //   console.log(data.jsondata)
      //   console.log(this.jsonToExcelOrBolb(data.xlsxdata))
      // }, 800)
    },
    filesOnLoad(json) {
      console.log(json)
      console.log(this.jsonToExcelOrBolb(json.xlsxdata))
    },
    handleClick (e) {
      let rawFile = e.target.files[0]
      console.log(rawFile)
      const reader = new FileReader()
      reader.onload = e => {
        console.log(e)
        const data = e.target.result
        const workbook = XLSX.read(data, { type: 'array' })
        this.inputfile = workbook
        console.log(workbook)
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const header = this.getHeaderRows(worksheet)
        const results = XLSX.utils.sheet_to_json(worksheet)
        console.log(XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[1]]))
        console.log(header)
        console.log(JSON.stringify(results))
      }
      reader.readAsArrayBuffer(rawFile)
    },
    getHeaderRows (sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      // let aa = []
      // for (var R = range.s.r; R <= range.e.r; ++R) {
      //   for (var C = range.s.c; C <= range.e.c; ++C) {
      //     let celladdress = { c: C, r: R }
      //     /* if an A1-style address is needed, encode the address */
      //     var cellref = XLSX.utils.encode_cell(celladdress)
      //     aa.push(cellref)
      //     // console.log('headers')
      //     // console.log(cellref)
      //   }
      // }
      // console.log('headers')
      // console.log(aa)
      return headers
    },
    toXlsxArrayBuffer () {},
    handleFiles (file) {
      var selectedFile = file.target.files[0]
      console.log(selectedFile)
      var reader = new FileReader()
      reader.readAsText(selectedFile)
      let _self = this
      reader.onload = function () {
        // console.log(this.result)
        let json = JSON.parse(this.result)
        _self.jsonToExcel(json)
      }
    },
    jsonToExcel (json) {
      // let filename = 'write.xlsx'
      let wsname = 'Sheet1'
      var wb = XLSX.utils.book_new()
      var ws = XLSX.utils.json_to_sheet(json)
      XLSX.utils.book_append_sheet(wb, ws, wsname)
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet2')
      let opts = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false,
        type: 'binary' // 二进制格式
      }
      console.log(this.inputfile['Styles'])
      XLSX.utils.book_append_sheet(wb, this.inputfile['Styles'], 'Styles')
      console.log(wb)
      var wbout = XLSX.write(wb, opts)
      console.log(wbout)
      // console.log('wbout')
      // console.log(wbout)
      let blob = new Blob([s2ab(wbout)], {
        type: 'application/octet-stream'
      })
      // 字符串转ArrayBuffer
      function s2ab (s) {
        var buf = new ArrayBuffer(s.length)
        var view = new Uint8Array(buf)
        for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
        return buf
      }
      var form = new FormData() // FormData 对象

      form.append('file', blob) // 文件对象
      console.log(form)
      console.log(form.get('file'))
      console.log(blob)
      XLSX.writeFile(wb, 'test.xlsx')

      const reader = new FileReader()
      reader.onload = e => {
        console.log(e)
        const data = e.target.result
        const workbook = XLSX.read(data, { type: 'array' })
        console.log(workbook)
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const header = this.getHeaderRows(worksheet)
        const results = XLSX.utils.sheet_to_json(worksheet)
        console.log(XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[1]]))
        console.log(header)
        console.log(JSON.stringify(results))
      }
      reader.readAsArrayBuffer(blob)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
