import React from 'react';
import {
  default as ConfirmationPopup,
  Props as ConfirmationPopupProps,
} from '../../Popup/ConfirmationPopup';
import { useTranslation } from 'react-i18next';
import {
  TrashBasket,
  SheetLocked,
  SheetUnlocked,
  SheetBanned,
  TrashCan,
} from '../../Icons/Confirmations';

export interface Props {
  confirmationType:
    | 'remove'
    | 'enable'
    | 'enableAll'
    | 'disable'
    | 'disableAll'
    | 'disableLast'
    | 'discardChanges'
    | 'leaveCreating';
  isOpen?: boolean;
  onCancel?(): void;
  onConfirm?(): void;
}

export const CommissionConfirmation: React.FC<Props> = ({
  isOpen = false,
  confirmationType,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation();

  const content = {
    remove: {
      title: t('commission.delete.confirmHeader'),
      text: t('commission.delete.confirmText'),
      confirmBtnLabel: t('commission.delete.confirmButton'),
      confirmBtnType: 'danger' as ConfirmationPopupProps['confirmBtnType'],
      icon: <TrashBasket />,
    },
    enable: {
      title: t('commission.enable.confirmHeader'),
      text: t('commission.enable.confirmText'),
      confirmBtnLabel: t('commission.enable.confirmButton'),
      icon: <SheetUnlocked />,
    },
    enableAll: {
      title: t('commission.enableAll.confirmHeader'),
      text: t('commission.enableAll.confirmText'),
      confirmBtnLabel: t('commission.enableAll.confirmButton'),
      icon: <SheetUnlocked />,
    },
    disable: {
      title: t('commission.disable.confirmHeader'),
      text: t('commission.disable.confirmText'),
      confirmBtnLabel: t('commission.disable.confirmButton'),
      confirmBtnType: 'danger' as ConfirmationPopupProps['confirmBtnType'],
      icon: <SheetLocked />,
    },
    disableAll: {
      title: t('commission.disableAll.confirmHeader'),
      text: t('commission.disableAll.confirmText'),
      confirmBtnLabel: t('commission.disableAll.confirmButton'),
      confirmBtnType: 'danger' as ConfirmationPopupProps['confirmBtnType'],
      icon: <SheetLocked />,
    },
    disableLast: {
      title: t('commission.disableLast.confirmHeader'),
      text: t('commission.disableLast.confirmText'),
      confirmBtnLabel: t('commission.disableLast.confirmButton'),
      confirmBtnType: 'danger' as ConfirmationPopupProps['confirmBtnType'],
      icon: <SheetBanned />,
    },
    discardChanges: {
      title: t('commission.discardChanges.confirmHeader'),
      text: t('commission.discardChanges.confirmText'),
      confirmBtnLabel: t('commission.discardChanges.confirmButton'),
      confirmBtnType: 'danger' as ConfirmationPopupProps['confirmBtnType'],
      icon: <TrashCan />,
    },
    leaveCreating: {
      title: t('commission.leaveCreating.confirmHeader'),
      text: t('commission.leaveCreating.confirmText'),
      confirmBtnLabel: t('commission.leaveCreating.confirmButton'),
      confirmBtnType: 'danger' as ConfirmationPopupProps['confirmBtnType'],
      icon: <TrashCan />,
    },
  };

  return (
    <ConfirmationPopup
      {...content[confirmationType]}
      onCancel={onCancel}
      onConfirm={onConfirm}
      isOpen={isOpen}
    />
  );
};
CommissionConfirmation.displayName = 'CommissionConfirmation';

export default CommissionConfirmation;
