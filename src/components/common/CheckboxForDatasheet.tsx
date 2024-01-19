import { Stack } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

/**
 * Checks if the item has required datasheet.
 * @param item - The item to check.
 * @returns a copy of the item with the datasheet required field set.
 */
export const datasheetRequired = (item: { id: string; createdTime: string; fields: any }) => {
  const itemCopy = { ...item };

  let datasheetRequired = false;
  if (itemCopy.fields.SPECIFICATION && itemCopy.fields.SPECIFICATION !== "NA") {
    datasheetRequired = true;
  }

  // If the Datasheet in AT is not there, will get undefined...
  if (itemCopy.fields.DATA_SHEET) {
    itemCopy.fields.DATA_SHEET[0].required = datasheetRequired;
  } else {
    itemCopy.fields.DATA_SHEET = [{ url: "", required: datasheetRequired }];
  }

  return itemCopy;
};

/**
 * Renders a checkbox with a link for each item in the data sheet.
 * @param params - An array of parameters for each item.
 * @param params.url - The url for the link.
 */
export function CheckboxWithLink(params: { url: string; required: boolean }) {
  return (
    <Stack direction="row" spacing={1}>
      <div className="checkbox-checked" />
      {params.url && (
        <a href={params.url} target="_blank" rel="noopener noreferrer">
          <LinkIcon />
        </a>
      )}
    </Stack>
  );
}

/**
 * Renders a checkbox for the datasheet item.
 * @param params - The parameters for the checkbox.
 * @param params.value - The value of the checkbox.
 */
export const CheckboxForDatasheet = (params: { value?: any[] }) => {
  if (params.value === undefined || params.value.length === 0) {
    return <div className="checkbox-na" />;
  }

  if (params.value[0].required === false) {
    return <div className="checkbox-na" />;
  }

  if (params.value[0].required === true) {
    if (params.value[0].url === "") {
      return <div className="checkbox-needed" />;
    } else {
      return CheckboxWithLink(params.value[0]);
    }
  }
};
