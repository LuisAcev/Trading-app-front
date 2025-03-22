import { useEffect, useState } from "react";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import { styled } from "@mui/system";
import { useGetCalculatorDataQuery } from "../../../../api/calculatroApi/CalculatroApi";
import { useDispatch } from "react-redux";
import { assetToCalc } from "../../../../store/slices/calcSlice";

export const DepositInstrumentBar = ({ options, setValue, setcalcValues }) => {
  const [values, setValues] = useState(options[0]);
  const [inputValue, setInputValue] = useState("");
  const { data } = useGetCalculatorDataQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      if (!data) {
        return;
      }

      if (data) {
        const selectInstrument = data.dataCal.filter(
          (item) => item.symbol === values.replace("/", "")
        );
        dispatch(
          assetToCalc({
            instrument: selectInstrument[0].symbol,
            price: parseFloat(selectInstrument[0].value),
            pipSize: selectInstrument[0].fx
              ? selectInstrument[0].symbol === "USDJPY"
                ? 0.001
                : 0.0001
              : 1,
            fx: selectInstrument[0].fx ? true : false,
          })
        );
        setcalcValues(0);
      }
    } catch (err) {
      console.log(err);
    }
  }, [data, values]);

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
  } = useAutocomplete({
    id: "controlled-state-demo",
    options,
    values,
    onChange: (event, newValue) => {
      setValues(newValue);
      setValue("instrument", newValue);
    },
    inputValue,
    onInputChange: (event, newInputValue) => setInputValue(newInputValue),
  });

  return (
    <Layout>
      <AutocompleteWrapper>
        <AutocompleteRoot
          {...getRootProps()}
          className={focused ? "Mui-focused" : ""}
        >
          <Input {...getInputProps()} />
        </AutocompleteRoot>
        {groupedOptions.length > 0 && (
          <Listbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <Option key={index} {...getOptionProps({ option, index })}>
                {option}
              </Option>
            ))}
          </Listbox>
        )}
      </AutocompleteWrapper>
    </Layout>
  );
};

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const AutocompleteWrapper = styled("div")`
  position: relative;
`;

const AutocompleteRoot = styled("div")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  border-radius: 8px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[500]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };
  display: flex;
  gap: 5px;
  padding-right: 5px;
  overflow: hidden;
  width: 200px;

  &.Mui-focused {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[700] : blue[200]
    };
  }

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus-visible {
    outline: 0;
  }
  @media screen and (max-width: 500px) {
    width: 150px;
  }
`
);

const Input = styled("input")(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
  flex: 1 0 auto;
`
);

const Listbox = styled("ul")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  max-width: 320px;
  border-radius: 12px;
  overflow: auto;
  outline: 0;
  max-height: 300px;
  z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  box-shadow: 0 4px 6px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.50)" : "rgba(0,0,0, 0.05)"
  };
  `
);

const Option = styled("li")(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    cursor: pointer;
  }

  &[aria-selected="true"] {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &.Mui-focused,
  &.Mui-focusVisible {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  &.Mui-focusVisible {
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[500] : blue[200]
    };
  }

  &[aria-selected="true"].Mui-focused,
  &[aria-selected="true"].Mui-focusVisible {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }
  `
);

const Layout = styled("div")`
  display: flex;
  flex-flow: column nowrap;
  gap: 4px;
`;
