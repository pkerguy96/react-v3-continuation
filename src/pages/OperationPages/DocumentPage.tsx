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

  const [selectedDocuments1, setSelectedDocuments1] = useState([
    { label: "Acromioplastie", checked: false, link: "/Acromioplastie.pdf" },
    { label: "Arthroscopie", checked: false, link: "/Arthroscopie.pdf" },
    {
      label: "L’arthrodèse de cheville",
      checked: false,
      link: "/Larthrodèsedecheville.pdf",
    },
    {
      label: "La prothèse totale de genou",
      checked: false,
      link: "/Laprothèseotaledegenou.pdf",
    },
    {
      label: "Le ligament croisé antérieur",
      checked: false,
      link: "/Leligamentcroiséantérieur.pdf",
    },
  ]);
  const [selectedDocuments2, setSelectedDocuments2] = useState([
    { label: "Document 1", checked: false, link: "/sample.pdf" },
    { label: "Document 2", checked: false, link: "/sample.pdf" },
    { label: "Document 3", checked: false, link: "/sample.pdf" },
    { label: "Document 4", checked: false, link: "/sample.pdf" },
  ]);

  const handleCheckboxChange1 = (index) => {
    const updatedDocuments = [...selectedDocuments1];
    updatedDocuments[index].checked = !updatedDocuments[index].checked;
    setSelectedDocuments1(updatedDocuments);
  };
  const handleCheckboxChange2 = (index) => {
    const updatedDocuments = [...selectedDocuments2];
    updatedDocuments[index].checked = !updatedDocuments[index].checked;
    setSelectedDocuments2(updatedDocuments);
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
    const selectedPDFs1 = selectedDocuments1.filter((doc) => doc.checked);
    const selectedPDFs2 = selectedDocuments2.filter((doc) => doc.checked);
    const selectedPDFs = [...selectedPDFs1, ...selectedPDFs2];

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
        className="grid grid-rows-1 grid-cols-1 lg:grid-cols-2 gap-4"
      >
        <Box className="flex flex-col gap-4">
          <Box className="flex justify-between">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              fiche des informations
            </Typography>
          </Box>
          <FormGroup>
            {selectedDocuments1.map((doc, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={doc.checked}
                    onChange={() => handleCheckboxChange1(index)}
                  />
                }
                label={doc.label}
              />
            ))}
          </FormGroup>
        </Box>
        <Box className="flex flex-col gap-4">
          <Box className="flex justify-between">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              lettre de reeducation
            </Typography>
          </Box>
          <FormGroup>
            {selectedDocuments2.map((doc, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={doc.checked}
                    onChange={() => handleCheckboxChange2(index)}
                  />
                }
                label={doc.label}
              />
            ))}
          </FormGroup>
        </Box>
        <Box className="flex justify-between flex-row mt-8 content-center lg:col-span-2">
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
