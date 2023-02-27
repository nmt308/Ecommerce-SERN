import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
function CheckboxesTags({ data, event }) {
    const optionData = data;
    return (
        <Autocomplete
            size="small"
            onChange={(e, value) => {
                event(e, value);
            }}
            multiple
            id="checkboxes-tags-demo"
            options={optionData}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            renderOption={(props, option, { selected }) => (
                <li {...props} key={option.id}>
                    <Checkbox
                        icon={<ImCheckboxUnchecked />}
                        checkedIcon={<ImCheckboxChecked />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.name}
                </li>
            )}
            style={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} placeholder="Nhập để tìm kiếm" />}
        />
    );
}
export default CheckboxesTags;
