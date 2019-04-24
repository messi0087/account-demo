import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as RecoedAPI from '../utils/RecordsAPI'

export default class Record extends Component {
    constructor(props){
        super(props);
        this.state={
            edit:false
        }
    }

    recordRow(){
        return(
            <tr>
                <td>{this.props.record.date}</td>
                <td>{this.props.record.title}</td>
                <td>{this.props.record.account}</td>
                <td>
                    <button className="btn btn-info mr-1" onClick={this.handleToggle.bind(this)}>Edite</button>
                    <button className="btn btn-danger" onClick={this.handleDelete.bind(this)}>Delete</button>
                </td>
            </tr>
        );
    }

    handleDelete(event){
        event.preventDefault();
        RecoedAPI.remove(this.props.record.id).then(
            response =>
                this.props.handleDeleteRecord(this.props.record)
        ).catch(
            error =>console.log(error.message)
        )
    }
    handleToggle(){
        this.setState({
            edit: !this.state.edit
        });
    }
    handleUpdate(event){
        event.preventDefault();
        this.setState({
            edit:false
        });
        const record ={
            date: this.refs.date.value,
            title:this.refs.title.value,
            account:this.refs.account.value
        };
        // console.log(record);
         RecoedAPI.update(this.props.record.id,record).then(
             response=>{
                  // console.log(this.props.record,response.data)
                 this.props.handleEditRecord(this.props.record,response.data);
             }
         ).catch(
             error =>console.log(error.message)
         )
    }
    recordForm(){
        return(
            <tr>
                <td><input type="text" className="form-control" defaultValue={this.props.record.date} ref='date'/></td>
                <td><input type="text" className="form-control" defaultValue={this.props.record.title} ref='title'/></td>
                <td><input type="text" className="form-control" defaultValue={this.props.record.account} ref='account'/></td>
                <td>
                    <button className="btn btn-info mr-1" onClick={this.handleUpdate.bind(this)}>Update</button>
                    <button className="btn btn-danger" onClick={this.handleToggle.bind(this)}>Cancel</button>
                </td>
            </tr>
        );
    }

    render() {
        if(this.state.edit){
            return this.recordForm();
        }else{
            return this.recordRow();
        }
    }
}

Record.propTtpes ={
    id:PropTypes.number,
    date:PropTypes.string,
    title:PropTypes.string,
    account:PropTypes.number
}






