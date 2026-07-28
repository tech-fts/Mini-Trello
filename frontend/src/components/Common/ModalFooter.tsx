/**
 * DRY: reusable modal footer with primary action + Cancel button.
 * Used by CardModal, CreateBoardModal, and any future modal with a save/create action.
 */
interface ModalFooterProps {
  /** Text for the primary action button */
  primaryLabel: string;
  /** Called when the primary button is clicked */
  onPrimary: () => void;
  /** Called when Cancel is clicked (closes the modal) */
  onCancel: () => void;
  /** Optional: disable the primary button */
  primaryDisabled?: boolean;
}

export function ModalFooter({
  primaryLabel,
  onPrimary,
  onCancel,
  primaryDisabled = false,
}: ModalFooterProps) {
  return (
    <div className="modal-footer">
      <button
        className="btn-primary"
        onClick={onPrimary}
        disabled={primaryDisabled}
      >
        {primaryLabel}
      </button>
      <button className="btn-secondary" onClick={onCancel} type="button">
        Cancel
      </button>
    </div>
  );
}
