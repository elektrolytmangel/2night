import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

type Props = {
  show: boolean;
  text: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export const DeleteConfirmation = (props: Props) => {
  const { t } = useTranslation();

  return (
    <Modal show={props.show} onHide={() => props.onCancel()}>
      <div className="admin-modal-container" data-bs-theme="dark">
        <div className="modal-content bg-black" data-bs-theme="dark">
          <div className="d-flex justify-content-between mb-3">
            <h5 className="modal-title text-primary">{t('delete_party_question', { text: props.text })}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={() => props.onCancel()}></button>
          </div>
          <div className="w-100 d-flex gap-2">
            <button type="button" className="btn btn-outline-primary w-100" onClick={props.onCancel}>
              {t('cancel')}
            </button>
            <button type="button" className="btn btn-primary w-100" onClick={props.onConfirm}>
              {t('delete')}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
