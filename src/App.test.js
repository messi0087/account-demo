import React from 'react';
import ReactDOM from 'react-dom';
import Records from './component/Records';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Records />, div);
  ReactDOM.unmountComponentAtNode(div);
});
