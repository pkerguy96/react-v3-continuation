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
        <div className="absolute w-full h-full inset-0 flex items-center justify-center p-48 z-[-1] opacity-5">
          <svg
            className="w-full block pointer-events-none text-blue-500"
            viewBox="0 0 444 325"
            fill="none"
          >
            <path
              d="M321.543 227.5C238.793 232.101 160.126 216.601 85.5427 181C61.2887 167.78 39.4552 151.28 20.0427 131.5C11.9638 120.95 5.96383 109.283 2.04273 96.5C-2.91667 71.7095 4.25003 51.2095 23.5427 35C42.4642 21.2384 63.4637 11.905 86.5427 7C103.318 2.7938 120.318 0.4605 137.543 0C110.162 4.0032 85.4957 14.3365 63.5427 31C41.902 51.3541 37.402 75.187 50.0427 102.5C63.1817 123.639 80.3487 140.806 101.543 154C165.91 190.972 235.41 210.139 310.043 211.5C356.36 212.07 400.527 202.737 442.543 183.5C442.876 183.833 443.21 184.167 443.543 184.5C429.718 196.748 414.052 205.915 396.543 212C372.085 220.457 347.085 225.624 321.543 227.5Z"
              className="text-gray-950"
              fill="currentColor"
            />
            <path
              d="M308.021 36.4998C321.21 35.7385 333.21 38.9052 344.021 45.9998C352.762 55.8583 358.262 67.3583 360.521 80.4998C363.873 123.547 358.373 165.38 344.021 206C335.688 206.667 327.354 206.667 319.021 206C318.44 205.107 318.106 204.107 318.021 203C326.694 173.477 332.527 143.31 335.521 112.5C336.061 103.476 335.728 94.4758 334.521 85.4998C333.385 75.0194 327.885 68.1861 318.021 64.9998C298.991 62.4359 280.325 64.1026 262.021 69.9998C243.624 74.2604 225.958 72.2604 209.021 63.9998C206.419 61.9838 204.752 59.8171 204.021 57.4998C211.195 60.4476 219.028 61.781 227.521 61.4998C233.068 61.4739 238.568 60.9739 244.021 59.9998C255.304 55.3629 266.638 50.6962 278.021 45.9998C288.039 42.5027 298.039 39.336 308.021 36.4998Z"
              fill="currentColor"
            />
            <path
              d="M124.021 44.5001C133.865 44.2723 143.532 45.439 153.021 48.0001C175.212 56.1972 196.546 66.1972 217.021 78.0001C237.575 87.0161 258.742 88.8491 280.521 83.5001C285.021 82.5 285.021 82.5 283.521 84.5C274.55 93.723 264.05 99.2231 251.021 100C239.377 101.281 228.044 99.9481 217.021 96.0001C205.441 93.0401 194.441 88.7061 184.021 83.0001C169.116 77.9191 153.783 75.086 138.021 74.5001C124.649 74.768 115.482 81.1011 110.521 93.5001C105.576 107.061 103.409 121.061 104.021 135.5C102.322 135.66 100.655 135.494 99.0215 135C89.5625 128.541 81.3955 120.708 74.5215 111.5C73.6255 94.7511 77.2925 79.0841 85.5215 64.5001C90.0715 58.5465 95.5715 53.7131 102.021 50.0001C109.344 47.5752 116.678 45.7419 124.021 44.5001Z"
              fill="currentColor"
            />
            <path
              d="M321.021 229.5C325.369 229.091 329.702 228.924 334.021 229C334.58 229.725 334.913 230.558 335.021 231.5C324.791 262.191 308.624 289.191 286.521 312.5C274.569 326.52 260.736 328.686 245.021 319C228.763 303.308 218.763 284.475 215.021 262.5C220.231 260.936 225.565 259.769 231.021 259C224.112 255.772 217.112 255.772 210.021 259C207.246 260.267 204.58 261.767 202.021 263.5C196.659 269.526 191.326 275.526 186.021 281.5C179.862 292.009 172.862 302.009 165.021 311.5C159.22 318.143 152.053 322.476 143.521 324.5C141.336 324.079 139.17 323.579 137.021 323C133.485 319.799 130.318 316.299 127.521 312.5C106.533 275.398 91.7003 235.731 83.0213 193.5C82.9483 189.927 84.6153 188.76 88.0213 190C95.6373 193.393 103.137 196.893 110.521 200.5C115.427 227.878 122.761 254.545 132.521 280.5C135.562 287.411 139.728 293.577 145.021 299C148.354 301 151.688 301 155.021 299C165.922 288.376 174.756 276.21 181.521 262.5C186.661 256.027 192.494 250.194 199.021 245C215.489 238.156 228.323 242.323 237.521 257.5C242.509 268.798 246.509 280.465 249.521 292.5C252.688 298.333 257.188 302.833 263.021 306C266.973 306.912 270.64 306.245 274.021 304C289.805 282.143 301.805 258.31 310.021 232.5C313.693 231.098 317.36 230.098 321.021 229.5Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="w-full flex gap-4 items-start">
          <div className="flex-1 flex flex-col items-center">
            <h1>Dr. Aymen Elkor</h1>
            <h2>Doctor-Churirgien</h2>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <svg
              className="w-20 h-20 block pointer-events-none text-blue-500"
              viewBox="0 0 444 325"
              fill="none"
            >
              <path
                d="M321.543 227.5C238.793 232.101 160.126 216.601 85.5427 181C61.2887 167.78 39.4552 151.28 20.0427 131.5C11.9638 120.95 5.96383 109.283 2.04273 96.5C-2.91667 71.7095 4.25003 51.2095 23.5427 35C42.4642 21.2384 63.4637 11.905 86.5427 7C103.318 2.7938 120.318 0.4605 137.543 0C110.162 4.0032 85.4957 14.3365 63.5427 31C41.902 51.3541 37.402 75.187 50.0427 102.5C63.1817 123.639 80.3487 140.806 101.543 154C165.91 190.972 235.41 210.139 310.043 211.5C356.36 212.07 400.527 202.737 442.543 183.5C442.876 183.833 443.21 184.167 443.543 184.5C429.718 196.748 414.052 205.915 396.543 212C372.085 220.457 347.085 225.624 321.543 227.5Z"
                className="text-gray-950"
                fill="currentColor"
              />
              <path
                d="M308.021 36.4998C321.21 35.7385 333.21 38.9052 344.021 45.9998C352.762 55.8583 358.262 67.3583 360.521 80.4998C363.873 123.547 358.373 165.38 344.021 206C335.688 206.667 327.354 206.667 319.021 206C318.44 205.107 318.106 204.107 318.021 203C326.694 173.477 332.527 143.31 335.521 112.5C336.061 103.476 335.728 94.4758 334.521 85.4998C333.385 75.0194 327.885 68.1861 318.021 64.9998C298.991 62.4359 280.325 64.1026 262.021 69.9998C243.624 74.2604 225.958 72.2604 209.021 63.9998C206.419 61.9838 204.752 59.8171 204.021 57.4998C211.195 60.4476 219.028 61.781 227.521 61.4998C233.068 61.4739 238.568 60.9739 244.021 59.9998C255.304 55.3629 266.638 50.6962 278.021 45.9998C288.039 42.5027 298.039 39.336 308.021 36.4998Z"
                fill="currentColor"
              />
              <path
                d="M124.021 44.5001C133.865 44.2723 143.532 45.439 153.021 48.0001C175.212 56.1972 196.546 66.1972 217.021 78.0001C237.575 87.0161 258.742 88.8491 280.521 83.5001C285.021 82.5 285.021 82.5 283.521 84.5C274.55 93.723 264.05 99.2231 251.021 100C239.377 101.281 228.044 99.9481 217.021 96.0001C205.441 93.0401 194.441 88.7061 184.021 83.0001C169.116 77.9191 153.783 75.086 138.021 74.5001C124.649 74.768 115.482 81.1011 110.521 93.5001C105.576 107.061 103.409 121.061 104.021 135.5C102.322 135.66 100.655 135.494 99.0215 135C89.5625 128.541 81.3955 120.708 74.5215 111.5C73.6255 94.7511 77.2925 79.0841 85.5215 64.5001C90.0715 58.5465 95.5715 53.7131 102.021 50.0001C109.344 47.5752 116.678 45.7419 124.021 44.5001Z"
                fill="currentColor"
              />
              <path
                d="M321.021 229.5C325.369 229.091 329.702 228.924 334.021 229C334.58 229.725 334.913 230.558 335.021 231.5C324.791 262.191 308.624 289.191 286.521 312.5C274.569 326.52 260.736 328.686 245.021 319C228.763 303.308 218.763 284.475 215.021 262.5C220.231 260.936 225.565 259.769 231.021 259C224.112 255.772 217.112 255.772 210.021 259C207.246 260.267 204.58 261.767 202.021 263.5C196.659 269.526 191.326 275.526 186.021 281.5C179.862 292.009 172.862 302.009 165.021 311.5C159.22 318.143 152.053 322.476 143.521 324.5C141.336 324.079 139.17 323.579 137.021 323C133.485 319.799 130.318 316.299 127.521 312.5C106.533 275.398 91.7003 235.731 83.0213 193.5C82.9483 189.927 84.6153 188.76 88.0213 190C95.6373 193.393 103.137 196.893 110.521 200.5C115.427 227.878 122.761 254.545 132.521 280.5C135.562 287.411 139.728 293.577 145.021 299C148.354 301 151.688 301 155.021 299C165.922 288.376 174.756 276.21 181.521 262.5C186.661 256.027 192.494 250.194 199.021 245C215.489 238.156 228.323 242.323 237.521 257.5C242.509 268.798 246.509 280.465 249.521 292.5C252.688 298.333 257.188 302.833 263.021 306C266.973 306.912 270.64 306.245 274.021 304C289.805 282.143 301.805 258.31 310.021 232.5C313.693 231.098 317.36 230.098 321.021 229.5Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <h1>Cabinet Benni mellal</h1>
            <h2>Adresse: el harti imm k n7</h2>
            <h3>+XXX XXXX XXXX</h3>
          </div>
        </div>
        <div className="w-2/3 mx-auto flex flex-col gap-6">
          <div className="w-full flex gap-4 items-center flex-col">
            <h1 className="font-bold text-2xl text-blue-500 underline">
              Ordonance
            </h1>
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
        <div className="w-full flex gap-2 items-center flex-col">
          <div className="w-1/3 h-1 bg-blue-500"></div>
          <p className="font-semibold">
            Tel: +XXX XXXX XXXX - +XXX XXXX XXXX - Adresse: XXXXX XXXXX XXXXX
            XXXXX
          </p>
          <p className="font-semibold">XXXXX@XXXXX.XX</p>
        </div>
      </div>
      <div
        id="page"
        className="hidden w-full flex-col gap-4 bg-white rounded-sm"
      >
        <div className="fixed w-full h-full inset-0 flex items-center justify-center z-[-1] opacity-5">
          <svg
            className="w-full block pointer-events-none text-blue-500"
            viewBox="0 0 444 325"
            fill="none"
          >
            <path
              d="M321.543 227.5C238.793 232.101 160.126 216.601 85.5427 181C61.2887 167.78 39.4552 151.28 20.0427 131.5C11.9638 120.95 5.96383 109.283 2.04273 96.5C-2.91667 71.7095 4.25003 51.2095 23.5427 35C42.4642 21.2384 63.4637 11.905 86.5427 7C103.318 2.7938 120.318 0.4605 137.543 0C110.162 4.0032 85.4957 14.3365 63.5427 31C41.902 51.3541 37.402 75.187 50.0427 102.5C63.1817 123.639 80.3487 140.806 101.543 154C165.91 190.972 235.41 210.139 310.043 211.5C356.36 212.07 400.527 202.737 442.543 183.5C442.876 183.833 443.21 184.167 443.543 184.5C429.718 196.748 414.052 205.915 396.543 212C372.085 220.457 347.085 225.624 321.543 227.5Z"
              className="text-gray-900"
              fill="currentColor"
            />
            <path
              d="M308.021 36.4998C321.21 35.7385 333.21 38.9052 344.021 45.9998C352.762 55.8583 358.262 67.3583 360.521 80.4998C363.873 123.547 358.373 165.38 344.021 206C335.688 206.667 327.354 206.667 319.021 206C318.44 205.107 318.106 204.107 318.021 203C326.694 173.477 332.527 143.31 335.521 112.5C336.061 103.476 335.728 94.4758 334.521 85.4998C333.385 75.0194 327.885 68.1861 318.021 64.9998C298.991 62.4359 280.325 64.1026 262.021 69.9998C243.624 74.2604 225.958 72.2604 209.021 63.9998C206.419 61.9838 204.752 59.8171 204.021 57.4998C211.195 60.4476 219.028 61.781 227.521 61.4998C233.068 61.4739 238.568 60.9739 244.021 59.9998C255.304 55.3629 266.638 50.6962 278.021 45.9998C288.039 42.5027 298.039 39.336 308.021 36.4998Z"
              fill="currentColor"
            />
            <path
              d="M124.021 44.5001C133.865 44.2723 143.532 45.439 153.021 48.0001C175.212 56.1972 196.546 66.1972 217.021 78.0001C237.575 87.0161 258.742 88.8491 280.521 83.5001C285.021 82.5 285.021 82.5 283.521 84.5C274.55 93.723 264.05 99.2231 251.021 100C239.377 101.281 228.044 99.9481 217.021 96.0001C205.441 93.0401 194.441 88.7061 184.021 83.0001C169.116 77.9191 153.783 75.086 138.021 74.5001C124.649 74.768 115.482 81.1011 110.521 93.5001C105.576 107.061 103.409 121.061 104.021 135.5C102.322 135.66 100.655 135.494 99.0215 135C89.5625 128.541 81.3955 120.708 74.5215 111.5C73.6255 94.7511 77.2925 79.0841 85.5215 64.5001C90.0715 58.5465 95.5715 53.7131 102.021 50.0001C109.344 47.5752 116.678 45.7419 124.021 44.5001Z"
              fill="currentColor"
            />
            <path
              d="M321.021 229.5C325.369 229.091 329.702 228.924 334.021 229C334.58 229.725 334.913 230.558 335.021 231.5C324.791 262.191 308.624 289.191 286.521 312.5C274.569 326.52 260.736 328.686 245.021 319C228.763 303.308 218.763 284.475 215.021 262.5C220.231 260.936 225.565 259.769 231.021 259C224.112 255.772 217.112 255.772 210.021 259C207.246 260.267 204.58 261.767 202.021 263.5C196.659 269.526 191.326 275.526 186.021 281.5C179.862 292.009 172.862 302.009 165.021 311.5C159.22 318.143 152.053 322.476 143.521 324.5C141.336 324.079 139.17 323.579 137.021 323C133.485 319.799 130.318 316.299 127.521 312.5C106.533 275.398 91.7003 235.731 83.0213 193.5C82.9483 189.927 84.6153 188.76 88.0213 190C95.6373 193.393 103.137 196.893 110.521 200.5C115.427 227.878 122.761 254.545 132.521 280.5C135.562 287.411 139.728 293.577 145.021 299C148.354 301 151.688 301 155.021 299C165.922 288.376 174.756 276.21 181.521 262.5C186.661 256.027 192.494 250.194 199.021 245C215.489 238.156 228.323 242.323 237.521 257.5C242.509 268.798 246.509 280.465 249.521 292.5C252.688 298.333 257.188 302.833 263.021 306C266.973 306.912 270.64 306.245 274.021 304C289.805 282.143 301.805 258.31 310.021 232.5C313.693 231.098 317.36 230.098 321.021 229.5Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="fixed top-0 left-0 right-0 bg-white w-full flex gap-4 items-start">
          <div className="flex-1 flex flex-col items-center">
            <h1>Dr. Aymen Elkor</h1>
            <h2>Doctor-Churirgien</h2>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <svg
              className="w-20 h-20 block pointer-events-none text-blue-500"
              viewBox="0 0 444 325"
              fill="none"
            >
              <path
                d="M321.543 227.5C238.793 232.101 160.126 216.601 85.5427 181C61.2887 167.78 39.4552 151.28 20.0427 131.5C11.9638 120.95 5.96383 109.283 2.04273 96.5C-2.91667 71.7095 4.25003 51.2095 23.5427 35C42.4642 21.2384 63.4637 11.905 86.5427 7C103.318 2.7938 120.318 0.4605 137.543 0C110.162 4.0032 85.4957 14.3365 63.5427 31C41.902 51.3541 37.402 75.187 50.0427 102.5C63.1817 123.639 80.3487 140.806 101.543 154C165.91 190.972 235.41 210.139 310.043 211.5C356.36 212.07 400.527 202.737 442.543 183.5C442.876 183.833 443.21 184.167 443.543 184.5C429.718 196.748 414.052 205.915 396.543 212C372.085 220.457 347.085 225.624 321.543 227.5Z"
                className="text-gray-900"
                fill="currentColor"
              />
              <path
                d="M308.021 36.4998C321.21 35.7385 333.21 38.9052 344.021 45.9998C352.762 55.8583 358.262 67.3583 360.521 80.4998C363.873 123.547 358.373 165.38 344.021 206C335.688 206.667 327.354 206.667 319.021 206C318.44 205.107 318.106 204.107 318.021 203C326.694 173.477 332.527 143.31 335.521 112.5C336.061 103.476 335.728 94.4758 334.521 85.4998C333.385 75.0194 327.885 68.1861 318.021 64.9998C298.991 62.4359 280.325 64.1026 262.021 69.9998C243.624 74.2604 225.958 72.2604 209.021 63.9998C206.419 61.9838 204.752 59.8171 204.021 57.4998C211.195 60.4476 219.028 61.781 227.521 61.4998C233.068 61.4739 238.568 60.9739 244.021 59.9998C255.304 55.3629 266.638 50.6962 278.021 45.9998C288.039 42.5027 298.039 39.336 308.021 36.4998Z"
                fill="currentColor"
              />
              <path
                d="M124.021 44.5001C133.865 44.2723 143.532 45.439 153.021 48.0001C175.212 56.1972 196.546 66.1972 217.021 78.0001C237.575 87.0161 258.742 88.8491 280.521 83.5001C285.021 82.5 285.021 82.5 283.521 84.5C274.55 93.723 264.05 99.2231 251.021 100C239.377 101.281 228.044 99.9481 217.021 96.0001C205.441 93.0401 194.441 88.7061 184.021 83.0001C169.116 77.9191 153.783 75.086 138.021 74.5001C124.649 74.768 115.482 81.1011 110.521 93.5001C105.576 107.061 103.409 121.061 104.021 135.5C102.322 135.66 100.655 135.494 99.0215 135C89.5625 128.541 81.3955 120.708 74.5215 111.5C73.6255 94.7511 77.2925 79.0841 85.5215 64.5001C90.0715 58.5465 95.5715 53.7131 102.021 50.0001C109.344 47.5752 116.678 45.7419 124.021 44.5001Z"
                fill="currentColor"
              />
              <path
                d="M321.021 229.5C325.369 229.091 329.702 228.924 334.021 229C334.58 229.725 334.913 230.558 335.021 231.5C324.791 262.191 308.624 289.191 286.521 312.5C274.569 326.52 260.736 328.686 245.021 319C228.763 303.308 218.763 284.475 215.021 262.5C220.231 260.936 225.565 259.769 231.021 259C224.112 255.772 217.112 255.772 210.021 259C207.246 260.267 204.58 261.767 202.021 263.5C196.659 269.526 191.326 275.526 186.021 281.5C179.862 292.009 172.862 302.009 165.021 311.5C159.22 318.143 152.053 322.476 143.521 324.5C141.336 324.079 139.17 323.579 137.021 323C133.485 319.799 130.318 316.299 127.521 312.5C106.533 275.398 91.7003 235.731 83.0213 193.5C82.9483 189.927 84.6153 188.76 88.0213 190C95.6373 193.393 103.137 196.893 110.521 200.5C115.427 227.878 122.761 254.545 132.521 280.5C135.562 287.411 139.728 293.577 145.021 299C148.354 301 151.688 301 155.021 299C165.922 288.376 174.756 276.21 181.521 262.5C186.661 256.027 192.494 250.194 199.021 245C215.489 238.156 228.323 242.323 237.521 257.5C242.509 268.798 246.509 280.465 249.521 292.5C252.688 298.333 257.188 302.833 263.021 306C266.973 306.912 270.64 306.245 274.021 304C289.805 282.143 301.805 258.31 310.021 232.5C313.693 231.098 317.36 230.098 321.021 229.5Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <h1>Cabinet Benni mellal</h1>
            <h2>Adresse: el harti imm k n7</h2>
            <h3>+XXX XXXX XXXX</h3>
          </div>
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="w-full flex gap-4 items-center flex-col">
            <h1 className="font-bold text-2xl text-blue-500 underline">
              Ordonance
            </h1>
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
        <div className="fixed bottom-0 left-0 right-0 bg-white w-full flex gap-2 items-center flex-col">
          <div className="w-1/3 h-1 bg-blue-500"></div>
          <p className="font-semibold">
            Tel: +XXX XXXX XXXX - +XXX XXXX XXXX _ Adresse: XXXXX XXXXX XXXXX
            XXXXX
          </p>
          <p className="font-semibold">XXXXX@XXXXX.XX</p>
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
