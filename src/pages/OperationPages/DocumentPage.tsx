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
    { label: "Document 1", checked: false, link: "/sample.pdf" },
    { label: "Document 2", checked: false, link: "/sample.pdf" },
    { label: "Document 3", checked: false, link: "/sample.pdf" },
    { label: "Document 4", checked: false, link: "/sample.pdf" },
  ]);

  const handleCheckboxChange = (index) => {
    const updatedDocuments = [...selectedDocuments];
    updatedDocuments[index].checked = !updatedDocuments[index].checked;
    setSelectedDocuments(updatedDocuments);
  };
  /* const handlePrintAndNext = () => {
    const selectedPDFs = selectedDocuments.filter((doc) => doc.checked);

    selectedPDFs.forEach((doc) => {
      if (ahmedtag.current) {
        // Check if ref is defined
        ahmedtag.current.href = doc.link;
        ahmedtag.current.click();
      } */
  /*  const newWindow = window.open(doc.link, "_blank");
      if (newWindow) {
        newWindow.addEventListener("load", () => {
          newWindow.print();
        });
      } */
  /*  });
    onNext(); */
  /*   onNext(); */
  /* }; */

  const handlePrintAndNext = async () => {
    const selectedPDFs = selectedDocuments.filter((doc) => doc.checked);

    const openAndPrintPDF = (doc): Promise<void> =>
      new Promise<void>((resolve) => {
        const newWindow = window.open(doc.link, "_blank");
        if (newWindow) {
          newWindow.addEventListener("load", () => {
            newWindow.print();
            resolve();
          });
        } else {
          resolve(); // Resolve immediately if window couldn't open (e.g., popup blocker)
        }
      });

    // Open and print each PDF, waiting for each to finish
    for (const doc of selectedPDFs) {
      await openAndPrintPDF(doc);
    }

    // Call onNext after all PDFs are opened and printed
    onNext();
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

        <Box className="flex justify-between flex-row mt-8 content-center">
          <Button
            className="w-full md:w-max !px-10 !py-3 rounded-lg "
            variant="outlined"
            onClick={() => {
              onNext();
            }}
          >
            <p className="text-sm ">Passer</p>
          </Button>
          <Button
            type="button"
            onClick={handlePrintAndNext}
            variant="contained"
            className="w-full md:w-max !px-10 !py-3 rounded-lg !ms-auto"
          >
            Suivant
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default DocumentPage;
