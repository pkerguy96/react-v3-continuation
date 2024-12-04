import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axiosInstance from "../services/Http";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import useUserRoles from "../zustand/UseRoles";

const style = {
  position: "absolute" as "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};
interface ModalComponentProps {
  open: boolean;
  onClose: () => void;
}
const ModalComponent = ({ open, onClose }: ModalComponentProps) => {
  const { setRoles, clearRoles } = useUserRoles();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      const response = await axiosInstance.get("/Admin/logout");
      if (response.status === 200) {
        localStorage.clear();
        queryClient.clear();
        clearRoles();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Box sx={style} className="w-[300px] md:w-[400px]">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to logout ?
          </Typography>
          <Box className="flex flex-row mt-5 content-center">
            <Button variant="outlined" sx={{ marginRight: "30px" }}>
              Cancel
            </Button>
            <Button onClick={logOut} variant="contained">
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalComponent;
