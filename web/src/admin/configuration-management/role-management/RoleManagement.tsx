import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { RoleForm } from './role-form/RoleForm';

type Props = {
  roles: string[];
  setRoles: (roles: string[]) => void;
};

export const RoleManagement = (props: Props) => {
  const { t } = useTranslation();
  const [showAddRoleForm, setShowAddRoleForm] = useState(false);

  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <p className="fs-3 text-primary m-auto">{t('roles')}</p>
          <button className="btn btn-outline-primary" onClick={() => setShowAddRoleForm(true)}>
            {t('edit_roles')}
          </button>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {props.roles.map((x) => (
            <h5 key={x}>
              <span className="badge bg-primary rounded-pill">{x}</span>
            </h5>
          ))}
        </div>
      </div>
      <Modal show={showAddRoleForm} onHide={() => setShowAddRoleForm(false)}>
        <div
          style={{
            display: 'flex',
            padding: '1rem',
            backgroundColor: 'black',
            border: '1px solid var(--bs-primary)',
            borderRadius: '8px',
          }}
          data-bs-theme="dark"
        >
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowAddRoleForm(false)}
            aria-label={t('close')}
            style={{ position: 'absolute', top: '1rem', right: '1rem' }}
          ></button>
          <RoleForm
            initalRoles={props.roles}
            setRoles={(r) => props.setRoles(r)}
            onClose={() => setShowAddRoleForm(false)}
          />
        </div>
      </Modal>
    </>
  );
};
