import { Box } from "@mui/material";

import { CACHE_KEY_Cachier, CACHE_KEY_CachierNumber } from "../../constants";
import getGlobal from "../../hooks/getGlobal";
import {
  CashierNumber,
  CashierNumberKpiClient,
  TotalcachierAmount,
} from "../../services/KpisService";
import LoadingSpinner from "../LoadingSpinner";
import LinechartKPI from "./LinechartKPI";

const CashierKpi = () => {
  const { data: data1, isLoading: isLoading1 } = getGlobal(
    {} as any,
    CACHE_KEY_Cachier,
    TotalcachierAmount,
    undefined
  );
  const { data: data2, isLoading: isLoading2 } = getGlobal(
    {} as CashierNumber,
    CACHE_KEY_CachierNumber,
    CashierNumberKpiClient,
    undefined
  );
  if (isLoading1 || isLoading2) return <LoadingSpinner />;

  const labels = data1 ? Object.keys(data1) : [];
  const dataset1 = {
    labels,
    datasets: [
      {
        label: "Recettes en espèces",
        data: data1 ? Object.values(data1) : [],
        borderColor: "#db2777",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <Box className="flex flex-col !w-full h-full">
      <Box className="!w-full flex flex-row justify-between p-6">
        <Box className="flex flex-col gap-1 mr-auto text-white my-auto">
          <p className="text-xl font-medium mr-auto"> Caisse</p>

          <p className="text-3xl font-semibold"> {data2} MAD</p>
        </Box>
        <svg
          className="pointer-events-none block w-[50px] h-[50px] !text-[var(--color-9)]"
          fill="currentColor"
          viewBox="0 -960 960 960"
        >
          <path d="M255-638q-38.2 0-64.6-27.125Q164-692.25 164-730v-100q0-38.613 26.4-65.306Q216.8-922 255-922h450q38.613 0 65.306 26.694Q797-868.613 797-830v100q0 37.75-26.694 64.875Q743.613-638 705-638H255Zm12-80h426q8 0 15.5-7.1T716-741v-78q0-8-7.5-15.5T693-842H267q-8 0-15.5 7.5T244-819v78q0 8.8 7.5 15.9T267-718ZM130-38q-38.612 0-65.306-26.694Q38-91.388 38-130v-55h884v55q0 38.612-26.694 65.306Q868.613-38 830-38H130ZM38-214l153-341q10-24 32.405-39T274-609h413q27.143 0 49.571 15Q759-579 770-555l153 341H38Zm291-80h40q11.2 0 18.1-7 6.9-7 6.9-17.5 0-11.5-6.9-19T369-345h-40q-11 0-18.5 7.4T303-319q0 11 7.5 18t18.5 7Zm0-91h40q11.2 0 18.1-7.5 6.9-7.5 6.9-18 0-11.5-6.9-18.5t-18.1-7h-40q-11 0-18.5 6.9T303-411q0 11 7.5 18.5T329-385Zm0-91h40q11.2 0 18.1-7.5 6.9-7.5 6.9-18 0-11.5-6.9-19T369-528h-40q-11 0-18.5 7.4T303-502q0 11 7.5 18.5T329-476Zm131 182h40q11.2 0 18.6-7 7.4-7 7.4-17.5 0-11.5-7.4-19T500-345h-40q-11 0-18.5 7.4T434-319q0 11 7.5 18t18.5 7Zm0-91h40q11.2 0 18.6-7.5 7.4-7.5 7.4-18 0-11.5-7.4-18.5t-18.6-7h-40q-11 0-18.5 6.9T434-411q0 11 7.5 18.5T460-385Zm0-91h40q11.2 0 18.6-7.5 7.4-7.5 7.4-18 0-11.5-7.4-19T500-528h-40q-11 0-18.5 7.4T434-502q0 11 7.5 18.5T460-476Zm131 182h40q11.2 0 18.6-7 7.4-7 7.4-17.5 0-11.5-7.4-19T631-345h-40q-10.2 0-17.6 7.4-7.4 7.4-7.4 18.6 0 11 7.4 18t17.6 7Zm0-91h40q11.2 0 18.6-7.5 7.4-7.5 7.4-18 0-11.5-7.4-18.5t-18.6-7h-40q-10.2 0-17.6 6.9-7.4 6.9-7.4 18.1 0 11 7.4 18.5T591-385Zm0-91h40q11.2 0 18.6-7.5 7.4-7.5 7.4-18 0-11.5-7.4-19T631-528h-40q-10.2 0-17.6 7.4-7.4 7.4-7.4 18.6 0 11 7.4 18.5T591-476Z"></path>
        </svg>
      </Box>

      <LinechartKPI dataset={dataset1} />
    </Box>
  );
};

export default CashierKpi;
