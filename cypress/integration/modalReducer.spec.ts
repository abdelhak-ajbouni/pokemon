import modalReducer, {
  ModalState,
  setIsOpen
} from 'src/utils/slices/modal';

describe('modal reducer', () => {
  const initialState: ModalState = {
    isOpen: false,
  };

  it('should return the initial state', () => {
    expect(modalReducer(undefined, { type: 'unknown' })).to.eql({
      isOpen: false,
    })
  })

  it('should return isOpen true', () => {
    const res = modalReducer(initialState, setIsOpen(true));
    expect(res.isOpen).to.be.true;
  });

  it('should return isOpen false', () => {
    const res = modalReducer(initialState, setIsOpen(false));
    expect(res.isOpen).to.be.false;
  });
});
