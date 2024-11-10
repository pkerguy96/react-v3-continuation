import {
  Paper,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
} from "@mui/material";
import { useRef, useState } from "react";

const DocumentPage = ({ onNext }) => {
  const ahmedtag = useRef<HTMLAnchorElement | null>(null);
  const [selectedDocuments, setSelectedDocuments] = useState([
    { label: "Document 1", checked: false, link: "../../../public/sample.pdf" },
    { label: "Document 2", checked: false, link: "../../../public/sample.pdf" },
    { label: "Document 3", checked: false, link: "../../../public/sample.pdf" },
    { label: "Document 4", checked: false, link: "../../../public/sample.pdf" },
  ]);
  const handleCheckboxChange = (index) => {
    const updatedDocuments = [...selectedDocuments];
    updatedDocuments[index].checked = !updatedDocuments[index].checked;
    setSelectedDocuments(updatedDocuments);
  };
  const handlePrintAndNext = () => {
    const selectedPDFs = selectedDocuments.filter((doc) => doc.checked);

    selectedPDFs.forEach((doc) => {
      if (ahmedtag.current) {
        // Check if ref is defined
        ahmedtag.current.href = doc.link;
        ahmedtag.current.click();
      }
      /*  const newWindow = window.open(doc.link, "_blank");
      if (newWindow) {
        newWindow.addEventListener("load", () => {
          newWindow.print();
        });
      } */
    });

    /*   onNext(); */
  };
  return (
    <Paper className="!p-6 w-full flex flex-col gap-4">
      <a className="hidden" target="_blank" ref={ahmedtag}></a>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        /*  onSubmit={handleSubmit(onSubmit)} */
        className="flex gap-4 flex-col"
      >
        <Box className="flex justify-between">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Document demandée
          </Typography>
        </Box>
        <FormGroup>
          {selectedDocuments.map((doc, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={doc.checked}
                  onChange={() => handleCheckboxChange(index)}
                />
              }
              label={doc.label}
            />
          ))}
        </FormGroup>

        <Box className="flex mt-4">
          <Button
            type="button"
            onClick={handlePrintAndNext}
            variant="contained"
            className="w-full md:w-max !px-10 !py-3 rounded-lg !ms-auto"
          >
            Next
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default DocumentPage;
