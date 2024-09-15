"use client";

import { world } from "@/lib/World";
import { useStore } from "@/store/store";
import React, { useState } from "react";
import { ComboboxItem, Select } from "@mantine/core";

import styles from "@/app/dots/components/country.module.css";
const CountrySelector = () => {
  const [value, setValue] = useState<ComboboxItem | null>(null);
  const selectedCountry = useStore((state) => state.country);
  const setSelectedCountry = useStore((state) => state.setSelectedCountry);
  const handleCountryChange = (value: string | null) => {
    // @ts-ignore
    setValue(value);
    if (value === "whole_world") {
      // Handle "Whole World" selection
      // @ts-ignore

      setSelectedCountry(null);
    } else {
      const country = world.features.find((f) => f.properties.NAME === value);
      // @ts-ignore

      setSelectedCountry(country || null);
    }
  };

  // Add the "Whole World" option with a string value
  const countryData = [
    { value: "whole_world", label: "Whole World" },
    ...world.features
      .filter((feature) => feature.properties.NAME !== "Fiji")
      .map((feature) => ({
        value: feature.properties.NAME,
        label: feature.properties.NAME,
      }))
      .sort((a, b) => a.label.localeCompare(b.label)), // Sort alphabetically
  ];
  return (
    <Select
      classNames={{
        root: styles.selectRoot,
        wrapper: styles.selectWrapper,
        input: styles.selectInput,
        dropdown: styles.selectDropdown,
        option: styles.selectOption,
      }}
      placeholder="Pick a country"
      value={value ? value.value : null}
      onChange={handleCountryChange}
      data={countryData}
      searchable
      // @ts-ignore
      onClear={() => setSelectedCountry(null)}
    />
  );
};

export default CountrySelector;
