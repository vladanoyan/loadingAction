import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Price from 'react-icons/lib/fa/dollar';
import Delete from 'react-icons/lib/go/trashcan';
import Person from 'react-icons/lib/io/android-cart';
import Card from 'react-icons/lib/md/add-shopping-cart';
import { actionDel } from '../../actions/actionDel';
import cs from './component.pcss';


class filterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      number: '',
      id: '',
      show: false,
    };
  }
  send(e) {
    if (this.state.value !== '' || this.state.number !== '') {
      this.props.dispatchText(this.state.value, this.state.number, Date.now());
    }
    e.preventDefault();
    this.setState({ value: '', number: '' });
  }
  rem(e) {
    console.log(e);
    this.props.sendDelete(e);
    this.setState({ show: true });
    setTimeout(() => {
      this.setState({ show: false });
    }, 2000);
  }
  render() {
    const itemFilter = this.props.contacts.filter(
      (item) => item.name.toLowerCase().indexOf(this.state.value.toLowerCase()) !== -1,
    );
    return (
      <div>
        <Container>
          <Row>
            <Col xs="12" sm="12" md="12">
              <h1 className={cs.title}>You can add items, filter items or delete thems</h1>
            </Col>
            <Col xs="12" sm="8" md="8">
              <form>
                <input
                  type="text"
                  className={cs.inputSearch}
                  placeholder="Product name"
                  value={this.state.value}
                  onChange={(e) => this.setState({ value: e.target.value.substr(0, 20) })}
                />
                <input
                  type="number"
                  className={cs.inputSearch}
                  placeholder="Product coast"
                  value={this.state.number}
                  onChange={(e) => this.setState({ number: e.target.value })}
                />
                <button className="alert-info" onClick={this.send.bind(this)}>Add Card</button>
                {itemFilter.map((item) => (
                  <li className={cs.listLi} key={item.id}>
                    <p><Person />{item.name}</p><p><Price />{item.price}</p>
                    <Delete
                      className={cs.delete}
                      onClick={this.rem.bind(this, item.id)}
                    /></li>))}
              </form >
            </Col>
            <Col xs="12" sm="4" md="4">
              <div className={cs.card}>
                <Card />
                {this.props.contacts.length}
              </div>
            </Col>
          </Row>
        </Container>
        <div className={cs.showbox} style={{ display: this.state.show ? 'block' : 'none' }}>
          <div className={cs.loader}>
            <svg className={cs.circular} viewBox="25 25 50 50">
              <circle className={cs.path} cx="50" cy="50" r="20" fill="none" />
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

filterList.propTypes = {
  dispatchText: PropTypes.func.isRequired,
  sendDelete: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatchText: (name, number, ky) => {
      dispatch({ type: 'ADD_USER', name, number, ky });
    },
    sendDelete: (num) => {
      dispatch(actionDel(num));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(filterList);
