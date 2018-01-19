import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/styles';
import TypeChecker from 'typeco';

import SearchField from '../components/SearchField';
import exampleSnippets from './exampleSnippets';

import './App.css';

const exampleList = [
  {
    name: 'Joe Smith',
    email: 'joesmith@gmail.com',
  },
  {
    name: 'Alan Donald',
    email: 'alan@gmail.com',
  },
];

const getMatchedList = (searchText) => {
  if (TypeChecker.isEmpty(searchText)) return exampleList;
  return exampleList.filter(item => item.name.includes(searchText) ||
    item.name.includes(searchText));
};

const ExampleList = props => (
  <div className="list-example">
    <div className="list-header">
      <ul>
        <li> Name </li>
        <li> Email </li>
      </ul>
    </div>
    <div className="list-body">
      {
        props.list.map((item, index) =>
          (<ul key={index}>
            <li> {item.name} </li>
            <li> {item.email} </li>
          </ul>))
      }
    </div>
  </div>
);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basicExampleList: [...exampleList],
      onEnterExampleList: [...exampleList],
      onSearchClickExampleList: [...exampleList],
    };
    this.onBasicExampleChange = this.onBasicExampleChange.bind(this);
    this.onEnterExample = this.onEnterExample.bind(this);
    this.onSearchClickExample = this.onSearchClickExample.bind(this);
  }

  onBasicExampleChange(value) {
    this.setState({
      basicExampleList: getMatchedList(value),
    });
  }

  onEnterExample(value) {
    this.setState({
      onEnterExampleList: getMatchedList(value),
    });
  }

  onSearchClickExample(value) {
    this.setState({
      onSearchClickExampleList: getMatchedList(value),
    });
  }

  render() {
    return (
      <div className="react-search-field-demo container">
        <h3>React Search Field</h3>
        <div>
          <h5>Installation </h5>
          <SyntaxHighlighter style={github}>
            {exampleSnippets.installation}
          </SyntaxHighlighter>
        </div>
        <div>
          <h5>Basic Example </h5>
          <SyntaxHighlighter style={github}>
            {exampleSnippets.basicExample}
          </SyntaxHighlighter>
          <SearchField
            placeholder="Search item"
            onChange={this.onBasicExampleChange}
          />
          <ExampleList
            list={this.state.basicExampleList}
          />
        </div>
        <div>
          <h5>Example: onEnter </h5>
          <SyntaxHighlighter style={github}>
            {exampleSnippets.onEnterExample}
          </SyntaxHighlighter>
          <SearchField
            placeholder="Search item"
            onEnter={this.onEnterExample}
          />
          <ExampleList
            list={this.state.onEnterExampleList}
          />
        </div>
        <div>
          <h5>Example: onSearchClick  </h5>
          <SyntaxHighlighter style={github}>
            {exampleSnippets.onSearchClickExample}
          </SyntaxHighlighter>
          <SearchField
            placeholder="Search item"
            onSearchClick={this.onSearchClickExample}
          />
          <ExampleList
            list={this.state.onSearchClickExampleList}
          />
        </div>
      </div>
    );
  }
}

export default App;