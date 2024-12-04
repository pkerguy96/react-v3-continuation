import { useParams } from "react-router";

import ordonanceApiClient, { Ordonance } from "../services/OrdonanceService";

import LoadingSpinner from "./LoadingSpinner";
import Button from "@mui/material/Button";
import PrintIcon from "@mui/icons-material/Print";
import { Box } from "@mui/material";
import { CACHE_KEY_Ordonance } from "../constants";
import getGlobalById from "../hooks/getGlobalById";
function $tempkate(opts: any) {
  const { lang, dir, size, margin, css, page } = opts;
  return `<!DOCTYPE html><html lang="${lang}"dir="${dir}"><head><meta charset="UTF-8"/><meta http-equiv="X-UA-Compatible"content="IE=edge"/><meta name="viewport"content="width=device-width, initial-scale=1.0"/><style>@page{size:${size.page};margin:${margin}}#page{width:100%}#head{height:${size.head}}#foot{height:${size.foot}}</style>${css}</head><body><table id="page"><thead><tr><td><div id="head"></div></td></tr></thead><tbody><tr><td><main id="main">${page}</main></td></tr></tbody><tfoot><tr><td><div id=foot></div></td></tr></tfoot></table></body></html>`;
}

function Print(target: any) {
  const page = document.querySelector(target);

  var iframe = document.createElement("iframe");
  iframe.style.display = "none";
  document.body.appendChild(iframe);
  var iframeDoc = iframe.contentDocument || iframe?.contentWindow?.document;
  iframeDoc?.open();
  iframeDoc?.write(
    $tempkate({
      size: {
        page: "A5",
        head: "100px",
        foot: "80px",
      },
      page: page.innerHTML,
      margin: "10mm 10mm 10mm 10mm",
      css: [
        '<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css" rel="stylesheet">',
      ],
    })
  );
  iframeDoc?.close();
  iframe.onload = function () {
    iframe?.contentWindow?.print();
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  };
}
const PrintableComponant = () => {
  const { id } = useParams();
  if (!id) {
    return <div>No ID specified.</div>;
  }

  const { data, isLoading } = getGlobalById(
    {} as Ordonance,
    [CACHE_KEY_Ordonance[0], id],
    ordonanceApiClient,
    undefined,
    parseInt(id)
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const FormattedDate = data?.date.split("-");

  return (
    <>
      <div className="w-full flex flex-col gap-4 bg-white rounded-sm p-4 relative z-[1]">
        <div className="w-2/3 mx-auto flex flex-col gap-6">
          <div className="w-full flex gap-4 items-center flex-col">
            <p className="font-semibold">
              Fait a beni mellal Le {FormattedDate[0]}/{FormattedDate[1]}/
              {FormattedDate[2]}
            </p>
            <p className="font-semibold">
              Nom & Prenom: {data?.patient.nom} {data?.patient.prenom}
            </p>
          </div>
          <div className="w-full flex flex-col gap-4 my-10">
            <div className="w-full flex flex-col gap-2">
              {data?.ordonance_details.map((details: any, index: number) => (
                <div key={index}>
                  <h3 className="font-bold">
                    {index + 1}- {details.medicine_name}
                  </h3>
                  <p className="ms-4">{details.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        id="page"
        className="hidden w-full flex-col gap-4 bg-white rounded-sm"
      >
        <div className="w-full flex flex-col gap-6">
          <div className="w-full flex gap-4 items-center flex-col">
            <p className="font-semibold">
              Fait a beni mellal Le {FormattedDate[0]}/{FormattedDate[1]}/
              {FormattedDate[2]}
            </p>
            <p className="font-semibold">
              Nom & Prenom: {data?.patient.nom} {data?.patient.prenom}
            </p>
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col gap-2">
              {data?.ordonance_details.map((details: any, index: number) => (
                <div key={index}>
                  <h3 className="font-bold">
                    {index + 1}- {details.medicine_name}
                  </h3>
                  <p className="ms-4">{details.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Box className="flex flex-col gap-4 sm:flex-row justify-end  mt-2 w-full ">
        <Button
          className="mt-4"
          variant="contained"
          size="large"
          color="primary"
          startIcon={<PrintIcon />}
          onClick={() => Print("#page")}
        >
          Print
        </Button>
      </Box>
    </>
  );
};

export default PrintableComponant;
