import React, {Component} from 'react';
import API from '../API';
import linkStore from '../stores/LinkStore';

let _getAppState = () => {
  return { links: linkStore.getAll() };
}
export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = _getAppState();
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount(){
    API.fetchLinks();
    linkStore.on('change', this.onChange);
  }
  componentWillUnmount() {
    linkStore.removeListener('change', this.onChange);
  }
  onChange() {
    console.log('4. In the View');
    this.setState(_getAppState());
  }
  render() {
    let content = this.state.links.map(link => {
      return <li key={link._id}>
              <a href={link.url}>{link.title}</a>
               </li>;
    });
    return (
      <div>
        <h3>Links</h3>
        <ul>
          {content}
        </ul>
      </div>
    );
  }
}
