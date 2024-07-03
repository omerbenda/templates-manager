import ConfirmModal from '../../../../Common/Components/ConfirmModal/ConfirmModal';

type Props = {
  open: boolean;
  closeHandler: () => void;
  onResponse: (confirmed: boolean) => void;
  templatesCount: number;
};

const DeleteAllTemplatesModal = ({
  open,
  closeHandler,
  onResponse,
  templatesCount,
}: Props) => {
  return (
    <ConfirmModal
      open={open}
      closeHandler={closeHandler}
      onResponse={onResponse}
    >
      <div className="select-none">
        <div className="text-start text-base font-semibold">
          Delete All Template
        </div>
        <div className="text-start">
          Permanently delete {templatesCount}{' '}
          {templatesCount !== 1 ? 'templates' : 'template'}? You can't undo
          this.
        </div>
      </div>
    </ConfirmModal>
  );
};

export default DeleteAllTemplatesModal;
