// source https://blog.logrocket.com/the-complete-guide-to-building-inline-editable-ui-in-react/
import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState.js';

export const Editable = ({ game, childRef, text, type, placeholder, children, ...props }) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing, childRef]);
  /*
- It will display a label is `isEditing` is false
- It will display the children (input or textarea) if `isEditing` is true
- when input `onBlur`, we will set the default non edit mode
*/
  return (
    <section {...props}>
      {isEditing ? (
        <div onBlur={() => setEditing(false)}>
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
