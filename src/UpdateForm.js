import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class UpdateForm extends React.Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => this.props.updateValues(e)}>
            <label>strDrink</label>
            <input
              name="strDrink"
              defaultValue={this.props.strDrink}
              type="text"
            />

            <label>strDrinkThumb</label>
            <input
              name="strDrinkThumb"
              defaultValue={this.props.strDrinkThumb}
              type="text"
            />

            <input type="submit" value="update" />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default UpdateForm;
