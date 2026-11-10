const {test}=require('node:test')
const assert=require('node:assert/strict')
const {safeCsvCell,rowsToCsv}=require('../src/utils/csv')
test('escapa fórmulas do Excel',()=>{
 for(const input of ['=1+1','+cmd','-8','@A1','  =HYPERLINK(1)','\t=1'])assert.ok(safeCsvCell(input).includes("'"),input)
})
test('escapa aspas e mantém CSV válido',()=>{assert.equal(safeCsvCell('Ana "Silva"'),'"Ana ""Silva"""');assert.ok(rowsToCsv([{nome:'Ana',tel:'123'}],['nome','tel']).includes('"Ana","123"'))})
