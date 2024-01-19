import { Box, Modal } from "@mui/material";
import "../../styles/Modal.css";

/**
 * Renders a loading modal-window component.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.showModal - Determines whether to show the modal or not.
 * @returns {JSX.Element} The loading modal component.
 */
function LoadingModal(props: { showModal?: boolean }) {
  return props.showModal ? (
    <Modal open={props.showModal}>
      <Box className="modal-box-loading">Loading Project Data...</Box>
    </Modal>
  ) : (
    <></>
  );
}

export default LoadingModal;
