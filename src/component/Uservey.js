import React, { Component } from 'react';

var firebase = require('firebase');
// import firebase from 'firebase/app';
var uid = require('uuid');

var firebaseConfig = {
    apiKey: "AIzaSyBEGe_EH3R30xSPENhgKzzKnbjs9NSZyjY",
    authDomain: "couise-cf941.firebaseapp.com",
    databaseURL: "https://couise-cf941.firebaseio.com",
    projectId: "couise-cf941",
    storageBucket: "couise-cf941.appspot.com",
    messagingSenderId: "856322656347",
    appId: "1:856322656347:web:690aefb253eab03059d77e"
  };
  
  firebase.initializeApp(firebaseConfig);



class Uservey extends Component {

    submitName(){
        var stuName = this.refs.name.value;
        this.setState({stuName}, () => {console.log(this.state);
        });
    };

    ansSelected(event){
        var answers = this.state.answers;
        if(event.target.name === 'ans1'){
            answers.ans1 = event.target.value;
        }else if( event.target.name === 'ans2'){
            answers.ans2 = event.target.value;
        }else if(event.target.name === 'ans3'){
            answers.ans3 = event.target.value;
        }

        this.setState({answers}, () => console.log(this.state.answers));
    };

    quesSubmit(){
        firebase.database().ref('couise/'+this.state.sid).set({
            stuName: this.state.stuName,
            answers: this.state.answers
        })
        this.setState({isSubmitted: true});
    };

    constructor(){
        super();
        this.state = {
            sid: uid.v1(),
            stuName: '',
            answers: {
                ans1: '',
                ans2: '',
                ans3: ''
            },
            isSubmitted: false
        }
        this.submitName = this.submitName.bind(this);
        this.ansSelected = this.ansSelected.bind(this);
        this.quesSubmit = this.quesSubmit.bind(this);
    }

    render() {
        let stuName;
        let questions;

        if(this.state.stuName === '' && this.state.isSubmitted === false){
            stuName = <div>
                <h1>Hey Student, Please Let us know your name</h1>
                <form onSubmit={this.submitName}>
                    <input className="namy" type="text" ref="name"/>
                </form>
            </div>;
            questions = ''
        }else if(this.state.stuName !== '' && this.state.isSubmitted === false){
            stuName = <h1>Hey {this.state.stuName} </h1>
            questions = <div>
                <h2>Here are some questions:</h2>
                <form onSubmit={this.quesSubmit}>
                    <div className="card">
                        <label htmlFor="">What kind of courses you like most?</label> <br/>
                        <input type="radio" name="ans1" value="Technology" onChange={this.ansSelected}/>Technology
                        <input type="radio" name="ans1" value="Religious" onChange={this.ansSelected}/>Religious
                        <input type="radio" name="ans1" value="History" onChange={this.ansSelected}/>History
                    </div>
                    <div className="card">
                        <label htmlFor="">You are a ?</label> <br/>
                        <input type="radio" name="ans2" value="Students" onChange={this.ansSelected}/>Students
                        <input type="radio" name="ans2" value="in-job" onChange={this.ansSelected}/>in-job
                        <input type="radio" name="ans2" value="Looking-job" onChange={this.ansSelected}/>Looking-job
                    </div>
                    <div className="card">
                        <label htmlFor="">is online courses helpful ?</label> <br/>
                        <input type="radio" name="ans3" value="Yes" onChange={this.ansSelected}/>Yes
                        <input type="radio" name="ans3" value="No" onChange={this.ansSelected}/>No
                        <input type="radio" name="ans3" value="Maybe" onChange={this.ansSelected}/>Maybe
                    </div>
                    <input type="submit" value="submit" className="feedback-button"/>
                </form>
            </div>
        }else if(this.state.isSubmitted === true){
            stuName = <h1>Thanks {this.state.stuName} </h1>;

        }



        return (
            <>
                {stuName}
                ----------------
                {questions}
            </>
        );
    }
}

export default Uservey;