import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { Button, Input, Select } from './common';
import { useData } from './providers';

const OPTIONS = {
  status: [
    { value: 'alive', label: 'Alive' },
    { value: 'dead', label: 'Dead' },
    { value: 'unknown', label: 'Unknown' }
  ],
  gender: [
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' },
    { value: 'genderless', label: 'Genderless' },
    { value: 'unknown', label: 'Unknown' }
  ],
  species: [
    { value: 'Human', label: 'Human' },
    { value: 'Alien', label: 'Alien' },
    { value: 'Humanoid', label: 'Humanoid' },
    { value: 'Poopybutthole', label: 'Poopybutthole' },
    { value: 'Mythological Creature', label: 'Mythological Creature' },
    { value: 'animal', label: 'Animal' },
    { value: 'robot', label: 'Robot' },
    { value: 'cronenberg', label: 'Cronenberg' },
    { value: 'disease', label: 'Disease' },
    { value: 'unknown', label: 'Unknown' }
  ]
};

function getSearchParams() {
  return new URLSearchParams(window.location.search);
}

function setSearchParams(params) {
  const url = new URL(window.location);
  url.search = params.toString();
  window.history.replaceState({}, '', url);
}

export function Filters() {
  const { setActivePage, setApiURL } = useData();
  const [formState, setFormState] = useState({
    status: null,
    gender: null,
    species: null,
    name: '',
    type: ''
  });

  useEffect(() => {
    const params = getSearchParams();
    setFormState({
      status: params.get('status') || null,
      gender: params.get('gender') || null,
      species: params.get('species') || null,
      name: params.get('name') || '',
      type: params.get('type') || ''
    });
  }, []);

  const getOptionValue = useCallback(
    (options, value) => options.find((o) => o.value === value) || null,
    []
  );

  const handleApply = useCallback(() => {
    const params = new URLSearchParams();
    Object.entries(formState).forEach(([key, val]) => {
      if (val && val !== '') params.set(key, val);
    });

    setSearchParams(params);
    setActivePage(0);

    setApiURL((prev) => {
      const url = new URL(prev);
      url.search = params.toString();

      return url.toString();
    });
  }, [formState, setActivePage, setApiURL]);

  const handleReset = useCallback(() => {
    setFormState({
      status: null,
      gender: null,
      species: null,
      name: '',
      type: ''
    });

    const params = new URLSearchParams();
    setSearchParams(params);
    setActivePage(0);

    setApiURL((prev) => {
      const url = new URL(prev);
      url.search = params.toString();

      return url.toString();
    });
  }, [setActivePage, setApiURL]);

  return (
    <FilterContainer>
      <Select
        options={OPTIONS.status}
        placeholder="Status"
        value={getOptionValue(OPTIONS.status, formState.status)}
        onChange={(option) =>
          setFormState((s) => ({ ...s, status: option?.value ?? null }))
        }
        isClearable
      />
      <Select
        options={OPTIONS.gender}
        placeholder="Gender"
        value={getOptionValue(OPTIONS.gender, formState.gender)}
        onChange={(option) =>
          setFormState((s) => ({ ...s, gender: option?.value ?? null }))
        }
        isClearable
      />
      <Select
        options={OPTIONS.species}
        placeholder="Species"
        value={getOptionValue(OPTIONS.species, formState.species)}
        onChange={(option) =>
          setFormState((s) => ({ ...s, species: option?.value ?? null }))
        }
        isClearable
      />
      <Input
        placeholder="Name"
        value={formState.name}
        onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
      />
      <Input
        placeholder="Type"
        value={formState.type}
        onChange={(e) => setFormState((s) => ({ ...s, type: e.target.value }))}
      />
      <ButtonWrapper>
        <Button onClick={handleApply}>Apply</Button>
        <Button color="#FF5152" onClick={handleReset}>
          Reset
        </Button>
      </ButtonWrapper>
    </FilterContainer>
  );
}

const FilterContainer = styled.div`
  display: grid;
  gap: 15px;
  max-width: 100%;

  @media (min-width: 530px) {
    grid-template-columns: 1fr 1fr 1fr;
    max-width: 482px;
  }

  @media (min-width: 950px) {
    gap: 10px;
    max-width: 560px;
  }
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;
