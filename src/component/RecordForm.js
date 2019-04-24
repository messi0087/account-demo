import React ,{Component} from  'react';
// import '../CSS/RecordForm.css'
import  * as RecordsAPI from '../utils/RecordsAPI'

export default class RecordForm extends Component{
    constructor(props){
        super(props);
        this.state ={
            date:"",
            title:'',
            account:''
        }
    }

    valid(){
        return this.state.date &&this.state.title &&this.state.account
    }

    handleChange(event){
        let name,obj;
        name =event.target.name;
        console.log(name);
        this.setState((
            obj ={},
                 obj["" +name] =event.target.value,
                 obj
        ))
    }

    handleSubmit(event){
        const date={
            date:this.state.date,
            title:this.state.title,
            account:this.state.account
        };
        event.preventDefault();
        RecordsAPI.create(date).then(
            response =>{
                this.props.handleNewRecords(response.data)
                this.setState({
                    date:"",
                    title:'',
                    account:''
                })
            }
        ).catch(
            error =>console.log(error.message)
        )
    }
    render() {
        return(
            <form className="form-inline mb-4" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group ml-2 mr-2">
                    <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Date" name='date' value={this.state.date}/>
                </div>

                <div className="form-group mr-2">
                    <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Title" name='title' value={this.state.title}/>
                </div>

                <div className="form-group mr-2">
                    <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Account" name='account' value={this.state.account}/>
                </div>
                <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Creat Record</button>
            </form>
        );
    }

}