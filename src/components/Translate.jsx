/* eslint-disable eqeqeq */
import React, { Component } from "react";
import './Translate.css';
import { ArrowLeftRight } from 'react-bootstrap-icons';
import axios from "axios";
class Translate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            output: "",
            language1: "en",
            language2: "th",
            selectLang: "selected"
        };
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSelectA = this.handleSelectA.bind(this);
        this.handleSelectB = this.handleSelectB.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
    }
    handleOnClick(e) {
        e.preventDefault();
        axios.get('https://translation.googleapis.com/language/translate/v2/', {
            params: {
                q: this.state.input,
                source: this.state.language1,
                target: this.state.language2,
                key: '' //Google API Key
            }
        })
            .then(function (response) {
                let translated_x = response.data.data.translations[0]
                this.setState({ output: translated_x.translatedText });
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }
    handleOnChange(e) {
        this.setState({ input: e.target.value });
    }
    handleSelectA(e) {
        this.setState({ language1: e.target.value });
    }
    handleSelectB(e) {
        this.setState({ language2: e.target.value });
    }
    handleSwitch(e) {
        this.setState(prevState => ({
            language1: prevState.language2,
            language2: prevState.language1
        }));
        this.setState(prevTextarea => ({
            input: prevTextarea.output,
            output: prevTextarea.input
        }));
    }
    render() {
        return (
            <div className="container">
                <div className="wrapper">
                    <div className="box-box-translate">
                        <div className="box-title">
                            <h1>Translate Language</h1>
                        </div>
                        <nav>
                            <ul>
                                <li>
                                    <select name="cmbLanguage1" onChange={this.handleSelectA} value={this.state.language1}>
                                        <option value="en" selected='{this.selectLang}'>English</option>
                                        <option value="es">Spanish</option>
                                        <option value="th">Thai</option>
                                    </select>
                                </li>
                                <li><button onClick={this.handleSwitch}><ArrowLeftRight /></button></li>
                                <li>
                                    <select name="cmbLanguage2" onChange={this.handleSelectB} value={this.state.language2}>
                                        <option value="en">English</option>
                                        <option value="es">Spanish</option>
                                        <option value="th" selected='{this.selectLang}'>Thai</option>
                                    </select>
                                </li>
                            </ul>
                        </nav>
                        <div className="box-textarea">
                            <textarea name="txtAreaInput" maxLength={1000} placeholder="Enter text"  value={this.state.input} onChange={this.handleOnChange}></textarea>
                            <textarea name="txtAreaOutput" readOnly disabled placeholder="Translation" value={this.state.output} />
                        </div>
                        <div className="box-button">
                            <button onClick={this.handleOnClick}>Translate Text</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
export default Translate;