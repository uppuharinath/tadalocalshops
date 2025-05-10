// ParentComponent.js (or App.js)
import { useState } from 'react';
import Body from './body';
import OtherComponent from './OtherComponent';

const ParentComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Body 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />
      <OtherComponent searchTerm={searchTerm} />
    </>
  );
};

export default ParentComponent;