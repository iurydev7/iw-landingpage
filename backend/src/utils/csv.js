function safeCsvCell(value){
 let text=String(value??'')
 // Excel/Sheets interpretam células começando por =, +, -, @ e controles como fórmula.
 if(/^[\s\t\r\n]*[=+@-]/.test(text)||/^[\t\r\n]/.test(text))text="'"+text
 return '"'+text.replace(/"/g,'""')+'"'
}
function rowsToCsv(rows,keys){return '\ufeff'+[keys.map(safeCsvCell).join(','),...rows.map(row=>keys.map(key=>safeCsvCell(row[key])).join(','))].join('\r\n')}
module.exports={safeCsvCell,rowsToCsv}
