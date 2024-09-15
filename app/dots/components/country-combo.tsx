import { useState, useEffect } from 'react';
import { Combobox, TextInput, useCombobox } from '@mantine/core';
import { world } from '@/lib/World';
import { useStore } from '@/store/store';

const groceries = world

const CountryDropdown = () => {
    const combobox = useCombobox({
      onDropdownClose: () => combobox.resetSelectedOption(),
    });
const selectedCountry = useStore((state) =>state.country)
  const setSelectedCountry = useStore((state) => state.setSelectedCountry)

    const [value, setValue] = useState(null);
    const geojsonData = world
    const countryNames = geojsonData ? geojsonData.features.map(f => f.properties.NAME) : [];
    const shouldFilterOptions = !countryNames.some((item) => item === value);
    const filteredOptions = shouldFilterOptions
      ? countryNames.filter((item) => item.toLowerCase().includes(value?.toLowerCase().trim() || ''))
      : countryNames;

    const options = filteredOptions.map((item) => (
      <Combobox.Option value={item} key={item}>
        {item}
      </Combobox.Option>
    ));

    useEffect(() => {
      combobox.selectFirstOption();
    }, [value]);

    return (
      <Combobox
      classNames={'combo'}
        onOptionSubmit={(optionValue) => {
          setValue(optionValue);
          const country = geojsonData.features.find(f => f.properties.NAME === optionValue);
          setSelectedCountry(country || null);
          combobox.closeDropdown();
        }}
        store={combobox}
      >
        <Combobox.Target>
          <TextInput
          style={{
            color: 'white'
          }}
            className="w-fit !rounded-2xl !bg-[#242328]  !text-[13px] !border-[#333038] !border !text-white "
           variant='unstyled'
            placeholder="world"
            value={value}
            onChange={(event) => {
              setValue(event.currentTarget.value);
              combobox.openDropdown();
            }}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => combobox.closeDropdown()}
          />
        </Combobox.Target>
        <Combobox.Dropdown
        variant='unstyled'
        className='max-h-[400px] border text-white !border-[#333038] rounded-lg bg-[#242328] h-full overflow-scroll w-full '>
          <Combobox.Options  className='max-h-[400px] text-white !border-[#333038] rounded-lg bg-[#242328] h-full overflow-scroll w-full '>
            {options.length === 0 ? <Combobox.Empty>Nothing found</Combobox.Empty> : options}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    );
  };
export default CountryDropdown