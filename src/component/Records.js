import React, { Component } from 'react';
import '../CSS/App.css';
import Record from './Record';
// import {getJSON} from "jquery";
// import axios from 'axios';
import  * as RecordsAPI from '../utils/RecordsAPI'
import  RecordForm from './RecordForm'
import AcountBox from './AccountBox'
export default class Records extends Component {

  constructor(props){
    super(props);
    this.state={
      error:null,
      isLoaded:false,
      records:[]
    }
  }

  componentDidMount(){
  // getJSON("http://localhost:3004/records").then(
  //     response =>this.setState({
  //       records:response,
  //       isLoaded:true,
  //     }),
  //     error =>this.setState({
  //       isLoaded:true,
  //       error
  //     })
  //     )
      // axios.get("http://localhost:3004/records").then(
      // axios.get(RecordsAPI.api).then(

      RecordsAPI.getALL().then(
          response =>this.setState({
            records:response.data,
            isLoaded:true,
          }),
          ).catch(
              error =>this.setState({
                  isLoaded:true,
                  error
        })
    )
  }

  addRecords(record){
      this.setState({
          error:null,
          isLoaded: true,
          records:[
              ...this.state.records, record
          ]
      })
         // console.log('okkkkk')
         // console.log(this.state);
    }

  updateRecord(record,data){
      const recordIndex =this.state.records.indexOf(record)
      const newRecords =this.state.records.map((item,index)=> {
          if (index !== recordIndex){
              return item;
          }
          return {
              ...item,
              ...data
          }
      });
      this.setState({
          records:newRecords
      });
    }

  deleteRecord(record){
      const recordIndex =this.state.records.indexOf(record);
      const newRecords =this.state.records.filter((item,index) =>index !==recordIndex);

      this.setState({
          records:newRecords
      })
      // console.log(newRecords);
  }

  creadits(){
      let credits =this.state.records.filter((record)=>{
          return record.account >=0;
      });

      return credits.reduce((prev,curr) =>{
          return prev + Number.parseInt(curr.account,0)
      },0)
  }

  debits(){
      let debits =this.state.records.filter((record)=>{
          return record.account <0;
      });

      return debits.reduce((prev,curr) =>{
          return prev + Number.parseInt(curr.account,0)
      },0)
  }

  balance(){
      return (this.creadits()+this.debits())
  }

  render() {
    const{ error,isLoaded, records} =this.state;
    let recordsComponent;

    if(error){
        recordsComponent = (<div>Error:Not found</div>);
    }
    else if(!isLoaded){
        recordsComponent =  (<div>Loading...</div>);
    }else{
        recordsComponent =(
            <table className='table table-bordered'>
              <thead>
              <tr>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Account</th>
                  <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              { records.map((record)=>
                  <Record
                      key={record.id}
                      record={record}
                      handleEditRecord={this.updateRecord.bind(this)}
                      handleDeleteRecord={this.deleteRecord.bind(this)}
                  />
              )}
              </tbody>
            </table>
      );
    }
    return(
        <div className="App">
            <h1>Records</h1>
            <div className='row mb-3'>
                <AcountBox text="总收入" type="success" account={this.creadits()}/>
                <AcountBox text="总支出" type="danger" account={this.debits()}/>
                <AcountBox text="账户" type="info" account={this.balance()}/>
            </div>
            <RecordForm handleNewRecords={this.addRecords.bind(this)}/>
            {recordsComponent}
        </div>
    );
  }
}

