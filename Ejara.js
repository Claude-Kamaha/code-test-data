const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const MaleWriter = createCsvWriter({
  path: 'males.csv',
  header: [
    {id: 'id', title: 'id'},
    {id: 'first_name', title: 'first_name'},
    {id: 'last_name', title: 'last_name'},
    {id: 'full_name', title: 'Surname'},
    {id: 'email', title: 'email'},
    {id: 'gender', title: 'gender'},
    {id: 'ip_address', title: 'ip_address'},
    {id: 'age', title: 'age'},
  ]
});

const FemaleWriter = createCsvWriter({
    path: 'females.csv',
    header: [
      {id: 'id', title: 'id'},
      {id: 'first_name', title: 'first_name'},
      {id: 'last_name', title: 'last_name'},
      {id: 'full_name', title: 'full_name'},
      {id: 'email', title: 'email'},
      {id: 'gender', title: 'gender'},
      {id: 'ip_address', title: 'ip_address'},
      {id: 'age', title: 'age'},
    ]
  });

  function compareAge(a,b){
    return (parseInt(a.age) - parseInt(b.age));
       
      
  } 

   let dataOfMales = [];
   let dataOfFemales = [];
fs.createReadStream('MOCK_DATA.csv')
  .pipe(csv())
  .on('data', (row) => {
    let user = {
        id : row.id,
        first_name : row.first_name,
        last_name : row.last_name,
        full_name : row.first_name + ' ' + row.last_name,
        email : row.email,
        gender : row.gender,
        ip_address : row.ip_address,
        age : row.age
    }
    if (row.gender == 'Male') {
        dataOfMales.push(user);
    } else if (row.gender == 'Female') {
        dataOfFemales.push(user);
    } 
      
      
  })
  .on('end', () => {
    dataOfMales.sort(compareAge);
    dataOfFemales.sort(compareAge);
    MaleWriter.writeRecords(dataOfMales);
    FemaleWriter.writeRecords(dataOfFemales);
    console.log('CSV file successfully processed');
  });

  