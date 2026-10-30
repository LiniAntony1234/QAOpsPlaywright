//import the exceljs  package
const ExcelJs=require('exceljs');
//import the playwright  package
const{test, expect}=require('@playwright/test');

async function writeTest(searchText,replaceText,change,filePath){
//create object of ExcelJs and use the method workbook() to go to the excel workbook
const workbook=new ExcelJs.Workbook();
//import the downloaded excel file
await workbook.xlsx.readFile(filePath);
//provide the sheet infrmation in excel sheet
const worksheet=workbook.getWorksheet('Sheet1');
const output=await readTest(worksheet,searchText);

const cell=worksheet.getCell(output.row,output.column+change.colchange);
cell.value=replaceText;
await workbook.xlsx.writeFile(filePath);
}
async function readTest(worksheet,searchText) {
    let output={
    row:-1,
column:-1};
 worksheet.eachRow((row,rowNumber)=>{
    row.eachCell((cell,colNumber)=>{
        //print value in the worksheet
        //console.log(cell.value);
        //update value in the excel sheet
        if(cell.value===searchText)
        {
            //console.log(rowNumber,colNumber);
            //or
            output.row=rowNumber;
            output.column=colNumber;
        }
})
}) 
return output;  
}
//calling the method to execute
//update mango price to 350
test('download_Upload_Test',async({page})=>{
const textSearch='Mango';
const updatedvalue='350';
//open url
await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
//wait
const downloadpromise=page.waitForEvent('download');
//click on download button
await page.getByRole('button',{name:'Download'}).click();
const dl=await downloadpromise;
const filepath=await dl.path();
//function to modify the excel sheet downloaded
await writeTest(textSearch,updatedvalue, {rowchange:0,colchange:2},
    filepath);

//upload the modified excelsheet
//await page.locator("#fileinput").click();
await page.locator("#fileinput").
setInputFiles( filepath);

//check whether updated vale correctly reflected in ui
const textLocator=page.getByText(textSearch);
//getting the row which has Mango
const desiredRow=await page.getByRole('row').filter({has:textLocator});
expect(desiredRow.locator("#cell-4-undefined")).toContainText(updatedvalue);

})

