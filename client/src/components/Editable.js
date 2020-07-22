// Editable.js
// source https://blog.logrocket.com/the-complete-guide-to-building-inline-editable-ui-in-react/
import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState.js';

// Component accept text, placeholder values and also pass what type of Input - input, textarea so that we can use it for styling accordingly
export const Editable = ({ game, childRef, text, type, placeholder, children, ...props }) => {
  // Manage the state whether to show the label or the input box. By default, label will be shown.
  // Exercise: It can be made dynamic by accepting initial state as props outside the component
  const [isEditing, setEditing] = useState(false);
  const { updateGameSold } = useContext(GlobalContext);
  const id = game._id;

  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }

    if (isEditing === false) {
      const updateBody = {
        id,
        amountSold: +text,
      };
      updateGameSold(updateBody);
    }
  }, [isEditing, childRef]);

  // Event handler while pressing any key while editing
  const handleKeyDown = (event, type) => {
    // Handle when key is pressed
  };

  /*
- It will display a label is `isEditing` is false
- It will display the children (input or textarea) if `isEditing` is true
- when input `onBlur`, we will set the default non edit mode
Note: For simplicity purpose, I removed all the classnames, you can check the repo for CSS styles
*/
  return (
    <section {...props}>
      {isEditing ? (
        <div onBlur={() => setEditing(false)} onKeyDown={(e) => handleKeyDown(e, type)}>
          {children}
        </div>
      ) : (
        <div onClick={() => setEditing(true)}>
          <span>{text || placeholder || 'Editable content'}</span>
        </div>
      )}
    </section>
  );
};

export default Editable;
