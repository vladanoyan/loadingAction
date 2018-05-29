const contactList = [
  {
    name: 'Apple',
    price: '450',
    id: 1,
  },
  {
    name: 'Orange',
    price: '400',
    id: 2,
  },
  {
    name: 'Lemon',
    price: '3500',
    id: 3,
  },
  {
    name: 'Banana',
    price: '30200',
    id: 4,
  },
];

const contacts = (state = contactList, action) => {
  switch (action.type) {
    case 'ADD_USER':
      console.log('dispatch Worked !!!', state);
      return [
        ...state,
        {
          name: action.name,
          price: action.number,
          id: action.ky,
        },
      ];
    case 'DEL_USER':
      console.log('dispatch DEL Worked !!!');
      return state.filter(element => element.id !== action.num);
    default:
      return state;
  }
};
export default contacts;
