import ConfirmModal from '../../../../Common/Components/ConfirmModal/ConfirmModal';

type Props = {
  open: boolean;
  closeHandler: () => void;
  onResponse: (confirmed: boolean) => void;
};

const DeleteTemplateModal = ({ open, closeHandler, onResponse }: Props) => {
  return (
    <ConfirmModal
      open={open}
      closeHandler={closeHandler}
      onResponse={onResponse}
    >
      <div className="select-none">
        <div className="text-start text-base font-semibold">
          Delete Template
        </div>
        <div className="text-start">
          Permanently delete this template? You can't undo this.
        </div>
      </div>
    </ConfirmModal>
  );
};

export default DeleteTemplateModal;
