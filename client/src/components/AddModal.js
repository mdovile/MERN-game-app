import React, { useState } from 'react';
import { FaRegPlusSquare } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Label} from 'reactstrap';

export const AddModal =  (props) => {
    
    const {
        buttonLabel,
        className
      } = props;
    
    const [modal, setModal] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [platform, setPlatform] = useState('Platform');
    const [bought, setBought] = useState(0);
    const [sold, setSold] = useState(0);
    const [notes, setNotes] = useState('');

    const toggle = () => setModal(!modal);
    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    const onDropdownClick = e => {
      setPlatform(e.target.value)
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(platform, bought, sold, notes);
    };

    const onPriceChange = e => {
      setBought(e.target.value);
    }

    const onSoldChange = e => {
      setSold(e.target.value);
    }

    const onNotesChange = e => {
      setNotes(e.target.value);
    }

    return (
        <div>

        <button type="button" className="openModalButton" style={{border: "none"}} data-toggle="modal" data-target="#exampleModal" onClick={toggle} >                     
            <IconContext.Provider value={{ size: 35 }}>
                <FaRegPlusSquare />
            </IconContext.Provider>
        </button>

      <Modal isOpen={modal} toggle={toggle} className={className}  backdrop='static'>
        <ModalHeader toggle={toggle}>Save To Your Games List</ModalHeader>
        <Form onSubmit={handleSubmit}>
        <ModalBody>

          <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} value={platform} >
              <DropdownToggle caret>
                {platform}
                </DropdownToggle>
              <DropdownMenu>
                <DropdownItem value="Playstation 4" onClick={onDropdownClick}>Playstation 4</DropdownItem>
                <DropdownItem value="Xbox One" onClick={onDropdownClick}>Xbox One</DropdownItem>
                <DropdownItem value="PC" onClick={onDropdownClick}>PC</DropdownItem>
                <DropdownItem value="Nintendo Switch" onClick={onDropdownClick}>Nintendo Switch</DropdownItem>
                <DropdownItem value="Playstation 3" onClick={onDropdownClick}>Playstation 3</DropdownItem>
                <DropdownItem value="Xbox 360" onClick={onDropdownClick}>Xbox 360</DropdownItem>
                <DropdownItem value="Other" onClick={onDropdownClick}>Other</DropdownItem>
              </DropdownMenu>
        </Dropdown>
        <Label for="pricePaid">Price paid</Label>
        <Input type="number" name="paid" id="pricePaid" placeholder="$" className="w-25" onChange={onPriceChange}/>
        <Label for="priceSold">Sold for (optional)</Label>
        <Input type="number" name="sold" id="priceSold" placeholder="$" className="w-25" onChange={onSoldChange}/>
        <Label for="descriptionText">Notes (optional)</Label>
        <Input type="textarea" name="descriptionText" id="descriptionText" onChange={onNotesChange} />

        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary" onClick={toggle}>Add Game</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}