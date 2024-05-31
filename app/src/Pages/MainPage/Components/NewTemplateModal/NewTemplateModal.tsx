import Modal from '../../../../Common/Components/Modal/Modal';

type Props = {
  open: boolean;
  closeHandler: () => void;
};

const NewTemplateModal = ({ open, closeHandler }: Props) => {
  return (
    <Modal open={open} closeHandler={closeHandler}>
      <div
        className="
            relative left-1/2 top-1/2
            -translate-x-1/2 -translate-y-1/2
            rounded border-black border-2
            bg-white
            w-1/2 h-1/2
          "
      >
        <div>test</div>
      </div>
    </Modal>
  );
};

export default NewTemplateModal;
