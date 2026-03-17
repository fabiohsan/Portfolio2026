export const ACTIVE_CONTRACT_TEMPLATE = {
  id: 'unus-desenvolvimento-integracao-digital-v2026-03',
  name: 'Contrato UNUS - Desenvolvimento e Integracao Digital',
  requiredFields: ['email_relatorios', 'estado_civil', 'cpf_representante'],
};

export const CONTRACT_FIELD_LABELS = {
  email_relatorios: 'E-mail principal',
  estado_civil: 'Estado civil',
  cpf_representante: 'CPF do representante',
};

const hasValue = (value) => String(value ?? '').trim().length > 0;

export const getContractMissingFields = (row = {}) =>
  ACTIVE_CONTRACT_TEMPLATE.requiredFields
    .filter((field) => !hasValue(row[field]))
    .map((field) => CONTRACT_FIELD_LABELS[field] || field);

export const isContractReady = (row = {}) => getContractMissingFields(row).length === 0;
