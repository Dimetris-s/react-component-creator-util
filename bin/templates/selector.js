const selectorTemplate = ({ sliceName, optional }) => `
import { StoreSchema } from '@/shared/types/store';

export const getTemplate = (state: StoreSchema) => state.${sliceName}${optional ? '?' : ''}.template;
`;

module.exports = { selectorTemplate };
