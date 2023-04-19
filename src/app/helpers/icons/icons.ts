import { IconDefinition } from '@ant-design/icons-angular';

import * as CustomIcons from './defenitions';


const customDesignIcons = CustomIcons as {
  [key: string]: IconDefinition;
};


const customIcons: IconDefinition[] = Object.keys(customDesignIcons).map(key => customDesignIcons[key]);


export const getCustomIcons = () => {
  const icons = [...customIcons];
  return icons;
}
