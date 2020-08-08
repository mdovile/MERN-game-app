import React, { useState, useContext } from 'react';
import { FaRegPlusSquare } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { GlobalContext } from '../context/GlobalState.js';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Label,
  Tooltip,
} from 'reactstrap';

export const AddModal = ({ title, slug }) => {
  const { addGame, token } = useContext(GlobalContext);

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [platform, setPlatform] = useState('Platform');
  const [amountPaid, setAmountPaid] = useState(0);
  const [amountSold, setAmountSold] = useState(0);
  const [notes, setNotes] = useState('');

  const toggleTooltip = () => {
    setTooltipOpen(!tooltipOpen);
  };

  const toggle = () => setModal(!modal);

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const onDropdownClick = (e) => {
    setPlatform(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newGame = {
      title,
      platform,
      amountPaid: +amountPaid,
      amountSold: +amountSold,
      notes,
      slug,
    };
    addGame(newGame);
  };

  const onPriceChange = (e) => {
    setAmountPaid(e.target.value);
  };

  const onSoldChange = (e) => {
    setAmountSold(e.target.value);
  };

  const onNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleTooltipToggle = () => {
    if (!token) toggleTooltip();
  };

  return (
    <div>
      <button 
      id="tooltip"
        type="button"
        style={{
          border: 'none',
          position: 'absolute',
          right: 20,
          top: 28,
          zIndex: 1,
          boxShadow: 'none',
          backgroundColor: 'transparent',
        }}
        data-toggle="modal"
        data-target="#exampleModal"
        onClick={token && toggle}
      >
        <IconContext.Provider value={{ size: 45 }}>
          <FaRegPlusSquare />
        </IconContext.Provider>
      </button>

      <Tooltip placement="top" isOpen={tooltipOpen} toggle={handleTooltipToggle} target="tooltip" trigger="click">
        Log in or register!
      </Tooltip>

      <Modal isOpen={modal} toggle={toggle} backdrop="static">
        <ModalHeader toggle={toggle}>Save To Your Games List</ModalHeader>
        <Form onSubmit={handleSubmit}>
          <ModalBody>
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} value={platform}>
              <DropdownToggle caret>{platform}</DropdownToggle>
              <DropdownMenu>
                <DropdownItem value="Playstation 4" onClick={onDropdownClick}>
                  Playstation 4
                </DropdownItem>
                <DropdownItem value="Xbox One" onClick={onDropdownClick}>
                  Xbox One
                </DropdownItem>
                <DropdownItem value="PC" onClick={onDropdownClick}>
                  PC
                </DropdownItem>
                <DropdownItem value="Nintendo Switch" onClick={onDropdownClick}>
                  Nintendo Switch
                </DropdownItem>
                <DropdownItem value="Playstation 3" onClick={onDropdownClick}>
                  Playstation 3
                </DropdownItem>
                <DropdownItem value="Xbox 360" onClick={onDropdownClick}>
                  Xbox 360
                </DropdownItem>
                <DropdownItem value="Other" onClick={onDropdownClick}>
                  Other
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Label for="pricePaid">Price paid</Label>
            <Input
              type="number"
              name="amountPaid"
              id="pricePaid"
              placeholder="$"
              className="w-25"
              onChange={onPriceChange}
            />
            <Label for="priceSold">Sold for (optional)</Label>
            <Input
              type="number"
              name="amountSold"
              id="priceSold"
              placeholder="$"
              className="w-25"
              onChange={onSoldChange}
            />
            <Label for="descriptionText">Notes (optional)</Label>
            <Input
              type="textarea"
              name="descriptionText"
              id="descriptionText"
              onChange={onNotesChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary" onClick={toggle}>
              Add Game
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};
